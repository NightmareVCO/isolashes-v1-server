import { AppointmentsService } from '@contexts/appointments/appointments.service';
import { CreateAppointmentDto } from '@contexts/appointments/dto/create-appointment.dto';
import { UpdateAppointmentDto } from '@contexts/appointments/dto/update-appointment.dto';
import { ServicesService } from '@contexts/services/services.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BranchesService } from '@subcontexts/branches/branches.service';
import { HoursService } from '@subcontexts/hours/hours.service';
import { getDateRange } from '@utils/getRangeDate';

import { UpdateUserIdOptionalDto } from '../auth/dto/update-user-parameters.dto';
import { UpdateAppointmentParametersDto } from './dto/update-appointment-parameters.dto';

type AppointmentDataType = {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  hours: { connect: { id: string } };
  service: { connect: { id: string } };
  branch: { connect: { id: string } };
  customer?: { connect: { id: string } };
};

type FindAllParameters = {
  skipValue?: string | number;
  takeValue?: string | number;
  cursor?: Prisma.AppointmentWhereUniqueInput;
  where?: Prisma.AppointmentWhereInput;
  whereValue?: string;
  order?: Prisma.AppointmentOrderByWithRelationInput;
  orderDirection?: 'asc' | 'desc';
  status?: string;
  branch?: string;
  service?: string;
  hour?: string;
  date?: string;
  query?: string;
};

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly branchService: BranchesService,
    private readonly hoursService: HoursService,
    private readonly servicesService: ServicesService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Headers('user-id') data: UpdateUserIdOptionalDto,
  ) {
    const userId = data as string;
    const appointmentData: AppointmentDataType = {
      ...createAppointmentDto,
      hours: {
        connect: { id: createAppointmentDto.hours },
      },
      service: { connect: { id: createAppointmentDto.service } },
      branch: { connect: { id: createAppointmentDto.branch } },
      customer: userId ? { connect: { id: userId } } : undefined,
    };
    return await this.appointmentsService.create(appointmentData);
  }

  @Get()
  async findAll(@Query() parameters: FindAllParameters) {
    const {
      skipValue,
      takeValue,
      cursor,
      order,
      orderDirection,
      status,
      branch,
      service,
      hour,
      date,
      query,
    } = parameters;
    const skip = skipValue ? Number.parseInt(skipValue as string) : undefined;
    const take = takeValue ? Number.parseInt(takeValue as string) : undefined;
    const orderBy = order ? { [order as string]: orderDirection } : undefined;
    const dateRange = date ? getDateRange(date) : undefined;
    let branchId = null;
    let serviceId = null;
    let hourId = null;

    if (branch) branchId = await this.branchService.findOneByName(branch);
    if (service) serviceId = await this.servicesService.findOneByName(service);
    if (hour) hourId = await this.hoursService.findByName(hour);
    const completed =
      status === 'Completadas'
        ? true
        : status === 'Pendientes'
          ? false
          : undefined;

    const where: Prisma.AppointmentWhereInput = {
      AND: [
        { completed },
        { branchId: branchId?.id },
        { hourId: hourId?.id },
        { serviceId: serviceId?.id },
        ...(dateRange ? [{ date: dateRange }] : []),
        query
          ? {
              OR: [
                { fullName: { contains: query, mode: 'insensitive' } },
                { fullName: { startsWith: query, mode: 'insensitive' } },
                { fullName: { endsWith: query, mode: 'insensitive' } },
                { fullName: { equals: query, mode: 'insensitive' } },
                { phone: { contains: query, mode: 'insensitive' } },
                { phone: { startsWith: query, mode: 'insensitive' } },
                { phone: { endsWith: query, mode: 'insensitive' } },
                { phone: { equals: query, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    return await this.appointmentsService.findAll({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  @Get('/count')
  async count() {
    return await this.appointmentsService.count();
  }

  @Get('available/:branch/:date')
  async findAvailable(
    @Param('date') date: string | number | Date,
    @Param('branch') branch: string,
  ) {
    return await this.appointmentsService.findAvailable({ branch, date });
  }

  @Get(':id')
  async findOne(@Param() { id }: UpdateAppointmentParametersDto) {
    return await this.appointmentsService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Param() { id }: UpdateAppointmentParametersDto,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    const { hours, service, branch, receipt, ...rest } = updateAppointmentDto;
    const data: Prisma.AppointmentUpdateInput = {
      ...rest,
      ...(hours ? { hours: { connect: { id: hours } } } : {}),
      ...(service ? { service: { connect: { id: service } } } : {}),
      ...(branch ? { branch: { connect: { id: branch } } } : {}),
      ...(receipt ? { receipt: { connect: { id: receipt } } } : {}),
    };
    return await this.appointmentsService.update({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  async remove(@Param() { id }: UpdateAppointmentParametersDto) {
    return await this.appointmentsService.remove({ id });
  }
}
