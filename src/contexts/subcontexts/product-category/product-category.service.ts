import { ZenstackService } from '@database/zenstack.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductCategoryService {
  constructor(private database: ZenstackService) {}
  async create(data: Prisma.ProductCategoryCreateInput) {
    return await this.database.prisma.productCategory.create({ data });
  }

  async findAll(parameters: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductCategoryWhereUniqueInput;
    where?: Prisma.ProductCategoryWhereInput;
    orderBy?: Prisma.ProductCategoryOrderByWithRelationInput;
  }) {
    const { where, orderBy } = parameters;

    return await this.database.prisma.productCategory.findMany({
      where,
      orderBy,
    });
  }

  async findOne(id: string) {
    return await this.database.prisma.productCategory.findUnique({
      where: { id },
    });
  }

  async findOneByName(name: string) {
    return await this.database.prisma.productCategory.findFirst({
      where: { name },
    });
  }

  async update(id: string, data: Prisma.ProductCategoryUpdateInput) {
    return await this.database.prisma.productCategory.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.database.prisma.productCategory.delete({
      where: { id },
    });
  }
}
