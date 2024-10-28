import { ShoppingCartService } from '@contexts/shopping-cart/shopping-cart.service';
import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductCategoryService } from '@subcontexts/product-category/product-category.service';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    Logger,
    PrismaService,
    ZenstackService,
    ShoppingCartService,
    ProductCategoryService,
  ],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(ProductsController);
  }
}
