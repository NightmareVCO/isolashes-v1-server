import { ZenstackService } from '@database/zenstack.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShoppingCartItemService {
  constructor(private database: ZenstackService) {}

  async create(data: Prisma.ShoppingCartItemCreateInput) {
    return this.database.prisma.shoppingCartItem.create({ data });
  }

  async findAll() {
    return this.database.prisma.shoppingCartItem.findMany();
  }

  async findOne(id: string) {
    return this.database.prisma.shoppingCartItem.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.ShoppingCartItemUpdateInput) {
    return this.database.prisma.shoppingCartItem.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.database.prisma.shoppingCartItem.delete({
      where: { id },
    });
  }
}
