import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ZenstackService } from '@src/database/zenstack.service';

@Injectable()
export class ProductImageService {
  constructor(private database: ZenstackService) {}
  create(data: Prisma.ProductImageCreateInput) {
    return this.database.prisma.productImage.create({ data });
  }

  findAll() {
    return this.database.prisma.productImage.findMany();
  }

  findOne(id: string) {
    return this.database.prisma.productImage.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.ProductImageUpdateInput) {
    return this.database.prisma.productImage.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.database.prisma.productImage.delete({ where: { id } });
  }
}
