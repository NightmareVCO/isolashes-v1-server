import { PrismaService } from '@database/prisma.service';
import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersItemService {
  constructor(
    private database: ZenstackService,
    private prisma: PrismaService,
  ) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.OrderItemCreateInput) {
    console.log(data);
    return await this.database.prisma.orderItem.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll(parameters: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderItemWhereUniqueInput;
    where?: Prisma.OrderItemWhereInput;
    orderBy?: Prisma.OrderItemOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = parameters;

    return await this.database.prisma.orderItem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        product: true,
        order: true,
      },
    });
  }

  @LogResponse()
  @HandleError()
  async findOne(id: string) {
    return await this.database.prisma.orderItem.findUnique({
      where: { id },
      include: {
        product: true,
        order: true,
      },
    });
  }

  @LogResponse()
  @HandleError()
  async update(parameters: {
    where: Prisma.OrderItemWhereUniqueInput;
    data: Prisma.OrderItemUpdateInput;
  }) {
    return await this.database.prisma.orderItem.update({
      where: parameters.where,
      data: parameters.data,
    });
  }

  @LogResponse()
  @HandleError()
  async remove(id: string) {
    return await this.database.prisma.orderItem.delete({ where: { id } });
  }
}
