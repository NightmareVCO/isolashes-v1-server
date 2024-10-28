import { PrismaService } from '@database/prisma.service';
import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private database: ZenstackService,
    private prisma: PrismaService,
  ) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return await this.database.prisma.product.create({ data });
  }

  @LogResponse()
  @HandleError()
  count() {
    return this.database.prisma.product.count();
  }

  @LogResponse()
  @HandleError()
  async findAll(parameters: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = parameters;

    const total = await this.database.prisma.product.count({ where });
    const products = await this.database.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        productImage: true,
        productCategory: true,
      },
    });

    return { products, total };
  }

  @LogResponse()
  @HandleError()
  async findOne(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return await this.database.prisma.product.findUnique({
      where: productWhereUniqueInput,
      include: {
        productImage: true,
        productCategory: true,
      },
    });
  }

  @LogResponse()
  @HandleError()
  async update(parameters: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { where, data } = parameters;
    return await this.database.prisma.product.update({ where, data });
  }

  @LogResponse()
  @HandleError()
  async remove(where: Prisma.ProductWhereUniqueInput) {
    return await this.database.prisma.product.delete({ where });
  }

  @LogResponse()
  @HandleError()
  async addInventory(parameters: {
    where: Prisma.ProductWhereUniqueInput;
    quantity: number;
  }) {
    const { where, quantity } = parameters;
    return await this.database.prisma.product.update({
      where,
      data: {
        stock: {
          increment: quantity,
        },
      },
    });
  }

  @LogResponse()
  @HandleError()
  async removeInventory(parameters: {
    where: Prisma.ProductWhereUniqueInput;
    quantity: number;
  }) {
    const { where, quantity } = parameters;
    return await this.database.prisma.product.update({
      where,
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }
}
