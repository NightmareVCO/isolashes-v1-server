import { ErrorHandlerModule } from '@core/general/error-handler/error-handler.module';
import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { ShoppingCartItemController } from './shopping-cart-item.controller';
import { ShoppingCartItemService } from './shopping-cart-item.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [ShoppingCartItemController],
  providers: [ShoppingCartItemService, Logger, PrismaService, ZenstackService],
  exports: [ShoppingCartItemService],
})
export class ShoppingCartItemModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(ShoppingCartItemController);
  }
}
