import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EyeConditionService {
  constructor(private database: ZenstackService) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.EyeConditionCreateInput) {
    return await this.database.prisma.eyeCondition.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll() {
    return await this.database.prisma.eyeCondition.findMany({});
  }

  @LogResponse()
  @HandleError()
  async findOne(id: string) {
    return await this.database.prisma.eyeCondition.findUnique({
      where: { id },
    });
  }

  @LogResponse()
  @HandleError()
  async findUnique(where: Prisma.EyeConditionWhereInput) {
    return await this.database.prisma.eyeCondition.findFirst({
      where,
    });
  }

  @LogResponse()
  @HandleError()
  async update(id: string, data: Prisma.EyeConditionUpdateInput) {
    return await this.database.prisma.eyeCondition.update({
      where: { id },
      data,
    });
  }

  @LogResponse()
  @HandleError()
  async remove(id: string) {
    return await this.database.prisma.eyeCondition.delete({ where: { id } });
  }
}
