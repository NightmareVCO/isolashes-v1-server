import { PrismaService } from '@database/prisma.service';
import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReceiptService {
  constructor(
    private database: ZenstackService,
    private prisma: PrismaService,
  ) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.ReceiptCreateInput) {
    return await this.database.prisma.receipt.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll(parameters: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReceiptWhereUniqueInput;
    where?: Prisma.ReceiptWhereInput;
    orderBy?: Prisma.ReceiptOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = parameters;

    const total = await this.database.prisma.receipt.count({ where });

    const receipts = await this.database.prisma.receipt.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        order: {
          include: {
            user: true,
            address: true,
            receipt: true,
            products: {
              include: {
                product: true,
              },
            },
          },
        },
        services: true,
        branch: true,
        user: true,
      },
    });

    return { receipts, total };
  }

  @LogResponse()
  @HandleError()
  async findOne(id: string) {
    return await this.database.prisma.receipt.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            user: true,
            address: true,
            receipt: true,
            products: {
              include: {
                product: true,
              },
            },
          },
        },
        services: true,
        branch: true,
        user: true,
      },
    });
  }

  @LogResponse()
  @HandleError()
  async update(parameters: {
    where: Prisma.ReceiptWhereUniqueInput;
    data: Prisma.ReceiptUpdateInput;
  }) {
    const { where, data } = parameters;

    return await this.database.prisma.receipt.update({
      where,
      data,
      include: {
        order: {
          include: {
            user: true,
            address: true,
            receipt: true,
            products: {
              include: {
                product: true,
              },
            },
          },
        },
        services: true,
        branch: true,
        user: true,
      },
    });
  }

  @LogResponse()
  @HandleError()
  async remove(id: string) {
    return this.database.prisma.receipt.delete({
      where: { id },
    });
  }
}
