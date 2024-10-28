import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { ReceiptService } from './receipt.service';

type FindAllParameters = {
  skipValue?: number | string;
  takeValue?: number | string;
  cursor?: Prisma.ReceiptWhereUniqueInput;
  where?: Prisma.ReceiptWhereInput;
  whereValue?: string;
  status?: string;
  order?: Prisma.ReceiptOrderByWithRelationInput;
  orderDirection?: 'asc' | 'desc';
  query?: string;
};

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  async create(@Body() createReceiptDto: CreateReceiptDto) {
    let services: Prisma.ServiceWhereUniqueInput[] = undefined;
    if (createReceiptDto.services) {
      const realServices = JSON.parse(createReceiptDto?.services);
      services = realServices
        ? realServices.map((service) => ({
            id: service.id,
          }))
        : undefined;
    }
    console.log(services);

    const data: Prisma.ReceiptCreateInput = {
      ...createReceiptDto,
      services: {
        connect: services,
      },
      user: createReceiptDto.user
        ? {
            connect: { id: createReceiptDto.user },
          }
        : undefined,
      branch: createReceiptDto.branch
        ? {
            connect: { id: createReceiptDto.branch },
          }
        : undefined,
      appointment: createReceiptDto.appointment
        ? {
            connect: { id: createReceiptDto.appointment },
          }
        : undefined,
      order: createReceiptDto.order
        ? { connect: { id: createReceiptDto.order } }
        : undefined,
      date: new Date(createReceiptDto.date),
    };

    return await this.receiptService.create(data);
  }

  @Get()
  async findAll(@Query() parameters: FindAllParameters) {
    const { skipValue, takeValue, cursor, order, orderDirection, query } =
      parameters;

    const skip = skipValue ? Number.parseInt(skipValue as string) : undefined;
    const take = takeValue ? Number.parseInt(takeValue as string) : undefined;
    const orderBy = order ? { [order as string]: orderDirection } : undefined;

    const where: Prisma.ReceiptWhereInput = {
      AND: [
        query
          ? {
              OR: [
                { user: { name: { contains: query } } },
                { user: { name: { startsWith: query } } },
                { user: { name: { endsWith: query } } },
                { user: { name: { equals: query } } },
                { user: { email: { contains: query } } },
                { user: { email: { startsWith: query } } },
                { user: { email: { endsWith: query } } },
                { user: { email: { equals: query } } },
                { user: { phone: { contains: query } } },
                { user: { phone: { startsWith: query } } },
                { user: { phone: { endsWith: query } } },
                { user: { phone: { equals: query } } },
                { userName: { contains: query } },
                { userName: { startsWith: query } },
                { userName: { endsWith: query } },
                { userName: { equals: query } },
                { userEmail: { contains: query } },
                { userEmail: { startsWith: query } },
                { userEmail: { endsWith: query } },
                { userEmail: { equals: query } },
                { userPhone: { contains: query } },
                { userPhone: { startsWith: query } },
                { userPhone: { endsWith: query } },
                { userPhone: { equals: query } },
                { paymentMethod: { contains: query } },
                { paymentMethod: { startsWith: query } },
                { paymentMethod: { endsWith: query } },
                { paymentMethod: { equals: query } },
                { appointment: { service: { name: { contains: query } } } },
                { appointment: { service: { name: { startsWith: query } } } },
                { appointment: { service: { name: { endsWith: query } } } },
                { appointment: { service: { name: { equals: query } } } },
              ],
            }
          : {},
      ],
    };

    return await this.receiptService.findAll({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.receiptService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReceiptDto: UpdateReceiptDto,
  ) {
    const realServices = JSON.parse(updateReceiptDto?.services);
    const services: Prisma.ServiceWhereUniqueInput[] = realServices
      ? realServices.map((service) => ({
          id: service,
        }))
      : undefined;

    const data: Prisma.ReceiptUpdateInput = {
      ...updateReceiptDto,
      services: {
        set: services,
      },
      user: updateReceiptDto.user
        ? {
            connect: { id: updateReceiptDto.user },
          }
        : undefined,
      branch: updateReceiptDto.branch
        ? {
            connect: { id: updateReceiptDto.branch },
          }
        : undefined,
      appointment: updateReceiptDto.appointment
        ? {
            connect: { id: updateReceiptDto.appointment },
          }
        : undefined,
      order: updateReceiptDto.order
        ? { connect: { id: updateReceiptDto.order } }
        : undefined,
    };

    return await this.receiptService.update({ where: { id }, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.receiptService.remove(id);
  }
}
