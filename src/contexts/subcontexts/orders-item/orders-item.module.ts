import { ProductsService } from '@contexts/products/products.service';
import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { OrdersItemController } from './orders-item.controller';
import { OrdersItemService } from './orders-item.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [OrdersItemController],
  providers: [
    OrdersItemService,
    Logger,
    PrismaService,
    ZenstackService,
    ProductsService,
  ],
})
export class OrdersItemModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(OrdersItemController);
  }
}
