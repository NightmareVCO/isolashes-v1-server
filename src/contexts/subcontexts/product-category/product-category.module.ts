import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, Logger, PrismaService, ZenstackService],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(ProductCategoryController);
  }
}
