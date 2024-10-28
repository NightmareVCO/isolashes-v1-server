import { ProductsService } from '@contexts/products/products.service';
import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [ShoppingCartController],
  providers: [
    ShoppingCartService,
    Logger,
    PrismaService,
    ZenstackService,
    ProductsService,
  ],
})
export class ShoppingCartModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(ShoppingCartController);
  }
}
