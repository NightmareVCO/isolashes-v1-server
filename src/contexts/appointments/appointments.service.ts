import { PrismaService } from '@database/prisma.service';
import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Appointment, Branch, Prisma } from '@prisma/client';
import { startOfDay, subDays } from 'date-fns';

import { timeMap } from '../subcontexts/hours/hours.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private database: ZenstackService,
    private prisma: PrismaService,
  ) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.AppointmentCreateInput): Promise<Appointment> {
    const { branch, date, hours } = data;
    const dateObject = new Date(date);

    // Contar las citas existentes para la misma fecha y hora
    const existingAppointmentsCount =
      await this.database.prisma.appointment.count({
        where: {
          branchId: branch.connect.id,
          date: dateObject,
          hourId: hours.connect.id,
        },
      });

    // Lanzar un error si ya existen 3 o más citas
    if (existingAppointmentsCount >= +process.env.APPOINTMENT_LIMIT) {
      throw new Error('Appointment already exists');
    }

    return await this.database.prisma.appointment.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll(parameters: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppointmentWhereUniqueInput;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = parameters;
    const total = await this.database.prisma.appointment.count({ where });

    const appointments = await this.database.prisma.appointment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        branch: true,
        customer: true,
        hours: true,
        service: {
          include: {
            serviceCategory: true,
          },
        },
      },
    });

    return {
      total,
      appointments,
    };
  }

  @LogResponse()
  @HandleError()
  async count() {
    const allAppointments = await this.database.prisma.appointment.count();
    const today = startOfDay(new Date());
    const yesterday = startOfDay(subDays(today, 1));
    const allAppointmentsToday = await this.database.prisma.appointment.count({
      where: {
        date: {
          gte: yesterday,
          lt: today,
        },
      },
    });

    return {
      all: allAppointments,
      allToday: allAppointmentsToday,
    };
  }

  @LogResponse()
  @HandleError()
  async findAvailable(parameters: {
    branch: Branch['id'];
    date: string | number | Date;
  }) {
    const { branch, date } = parameters;

    const dateObject = new Date(date);
    const appointments = await this.prisma.appointment.findMany({
      where: {
        date: {
          gte: new Date(dateObject.setHours(0, 0, 0, 0)),
          lt: new Date(dateObject.setHours(24, 0, 0, 0)),
        },
        branchId: branch,
        status: true,
      },
    });
    const allHours = await this.prisma.hour.findMany({
      where: { status: true },
    });

    // Count the number of appointments for each hour
    // eslint-disable-next-line unicorn/no-array-reduce
    const appointmentCounts = appointments.reduce(
      (accumulator, appointment) => {
        accumulator[appointment.hourId] =
          (accumulator[appointment.hourId] || 0) + 1;
        return accumulator;
      },
      {},
    );

    // Add isAvailable property to each timeslot
    const availableHours = allHours.map((hour) => ({
      ...hour,
      isAvailable:
        (appointmentCounts[hour.id] || 0) < process.env.APPOINTMENT_LIMIT,
    }));

    const sortedHours = availableHours.sort(
      (a: { time: string }, b: { time: string }) =>
        timeMap[a.time] - timeMap[b.time],
    );

    return sortedHours;
  }

  @LogResponse()
  @HandleError()
  async findOne(
    appointmentWhereUniqueInput: Prisma.AppointmentWhereUniqueInput,
  ): Promise<Appointment | null> {
    return await this.database.prisma.appointment.findUnique({
      where: appointmentWhereUniqueInput,
      include: {
        branch: true,
        customer: {
          include: {
            eyesConditions: true,
          },
        },
        hours: true,
        service: {
          include: {
            serviceCategory: true,
          },
        },
      },
    });
  }

  @LogResponse()
  @HandleError()
  async update(parameters: {
    where: Prisma.AppointmentWhereUniqueInput;
    data: Prisma.AppointmentUpdateInput;
  }): Promise<Appointment> {
    const { where, data } = parameters;
    return await this.database.prisma.appointment.update({
      where,
      data,
    });
  }

  @LogResponse()
  @HandleError()
  async remove(where: Prisma.AppointmentWhereUniqueInput) {
    return await this.database.prisma.appointment.delete({ where });
  }
}
