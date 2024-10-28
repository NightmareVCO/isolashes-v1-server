import { ProductsService } from '@contexts/products/products.service';
import { ReceiptService } from '@contexts/receipt/receipt.service';
import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { OrdersItemService } from '@subcontexts/orders-item/orders-item.service';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersItemService,
    ProductsService,
    ReceiptService,
    Logger,
    PrismaService,
    ZenstackService,
  ],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(OrdersController);
  }
}
