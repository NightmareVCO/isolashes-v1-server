import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private database: ZenstackService) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.ServiceCreateInput) {
    return await this.database.prisma.service.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll(parameters: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ServiceWhereUniqueInput;
    where?: Prisma.ServiceWhereInput;
    orderBy?: Prisma.ServiceOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = parameters;

    return await this.database.prisma.service.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { serviceCategory: true },
    });
  }

  @LogResponse()
  @HandleError()
  async findAllWithCategory() {
    const allCategories = await this.database.prisma.serviceCategory.findMany({
      where: { status: true },
    });
    const allServices = await this.database.prisma.service.findMany({
      where: { status: true },
      orderBy: { name: 'asc' },
    });

    return allCategories.map((category) => {
      return {
        category: category.name,
        description: category.description,
        services: allServices
          .filter((service) => service.serviceCategoryId === category.id)
          .map((service) => ({
            name: service.name,
            price: service.price,
          })),
      };
    });
  }

  @LogResponse()
  @HandleError()
  async count() {
    return await this.database.prisma.service.count();
  }

  @LogResponse()
  @HandleError()
  async findOne(id: string) {
    return await this.database.prisma.service.findUnique({ where: { id } });
  }

  @LogResponse()
  @HandleError()
  async findOneByName(name: string) {
    return await this.database.prisma.service.findFirst({ where: { name } });
  }

  @LogResponse()
  @HandleError()
  async update(id: string, data: Prisma.ServiceUpdateInput) {
    return await this.database.prisma.service.update({ where: { id }, data });
  }

  @LogResponse()
  @HandleError()
  async remove(id: string) {
    return await this.database.prisma.service.delete({ where: { id } });
  }
}
