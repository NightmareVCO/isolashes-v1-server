import { PrismaService } from '@database/prisma.service';
import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private database: ZenstackService,
    private prisma: PrismaService,
  ) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.OrderCreateInput) {
    return await this.database.prisma.order.create({
      data,
      include: { products: true },
    });
  }

  @LogResponse()
  @HandleError()
  async findAll(parameters: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = parameters;

    const total = await this.database.prisma.order.count({ where });

    const orders = await this.database.prisma.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        user: true,
        address: true,
        receipt: {
          include: {
            services: true,
            branch: true,
            user: true,
          },
        },
        products: {
          include: {
            product: {
              include: {
                productImage: true,
                productCategory: true,
              },
            },
          },
        },
      },
    });

    return { orders, total };
  }

  @LogResponse()
  @HandleError()
  async findOne(OrderWhereUniqueInput: Prisma.OrderWhereUniqueInput) {
    return await this.database.prisma.order.findUnique({
      where: OrderWhereUniqueInput,
      include: {
        user: true,
        address: true,
        receipt: {
          include: {
            services: true,
            branch: true,
            user: true,
          },
        },
        products: {
          include: {
            product: {
              include: {
                productImage: true,
                productCategory: true,
              },
            },
          },
        },
      },
    });
  }

  @LogResponse()
  @HandleError()
  async count() {
    return await this.database.prisma.order.count({
      where: { completed: false },
    });
  }

  @LogResponse()
  @HandleError()
  async update(parameters: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }) {
    const { where, data } = parameters;

    return await this.database.prisma.order.update({
      where,
      data,
      include: {
        user: true,
        address: true,
        receipt: {
          include: {
            services: true,
            branch: true,
            user: true,
          },
        },
        products: {
          include: {
            product: {
              include: {
                productImage: true,
                productCategory: true,
              },
            },
          },
        },
      },
    });
  }

  @LogResponse()
  @HandleError()
  async remove(id: string) {
    return await this.database.prisma.order.delete({
      where: { id },
    });
  }
}
