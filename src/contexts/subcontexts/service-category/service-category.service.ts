import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceCategoryService {
  constructor(private database: ZenstackService) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.ServiceCategoryCreateInput) {
    return await this.database.prisma.serviceCategory.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll(parameters: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ServiceCategoryWhereUniqueInput;
    where?: Prisma.ServiceCategoryWhereInput;
    orderBy?: Prisma.ServiceCategoryOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = parameters;

    return await this.database.prisma.serviceCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  @LogResponse()
  @HandleError()
  async findOne(id: string) {
    return await this.database.prisma.serviceCategory.findUnique({
      where: { id },
    });
  }

  @LogResponse()
  @HandleError()
  async update(id: string, data: Prisma.ServiceCategoryUpdateInput) {
    return await this.database.prisma.serviceCategory.update({
      where: { id },
      data,
    });
  }

  @LogResponse()
  @HandleError()
  async remove(id: string) {
    return await this.database.prisma.serviceCategory.delete({ where: { id } });
  }
}
