import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const timeMap: { [key: string]: number } = {
  '8:00 AM - 9:00 AM': 1,
  '9:00 AM - 10:00 AM': 2,
  '10:00 AM - 11:00 AM': 3,
  '11:00 AM - 12:00 PM': 4,
  '12:00 PM - 1:00 PM': 5,
  '1:00 PM - 2:00 PM': 6,
  '2:00 PM - 3:00 PM': 7,
  '3:00 PM - 4:00 PM': 8,
  '4:00 PM - 5:00 PM': 9,
  '5:00 PM - 6:00 PM': 10,
  '6:00 PM - 7:00 PM': 11,
};

@Injectable()
export class HoursService {
  constructor(private database: ZenstackService) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.HourCreateInput) {
    return await this.database.prisma.hour.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll() {
    const hours = await this.database.prisma.hour.findMany();
    const sortedHours = hours.sort(
      (a: { time: string }, b: { time: string }) =>
        timeMap[a.time] - timeMap[b.time],
    );
    return sortedHours;
  }

  @LogResponse()
  @HandleError()
  async findOne(id: string) {
    return await this.database.prisma.hour.findUnique({ where: { id } });
  }

  @LogResponse()
  @HandleError()
  async findByName(time: string) {
    return await this.database.prisma.hour.findFirst({ where: { time } });
  }

  @LogResponse()
  @HandleError()
  async update(id: string, data: Prisma.HourUpdateInput) {
    return await this.database.prisma.hour.update({ where: { id }, data });
  }

  @LogResponse()
  @HandleError()
  async remove(id: string) {
    return await this.database.prisma.hour.delete({ where: { id } });
  }
}
