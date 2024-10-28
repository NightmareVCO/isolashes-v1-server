import { ShoppingCartService } from '@contexts/shopping-cart/shopping-cart.service';
import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    Logger,
    PrismaService,
    ZenstackService,
    ShoppingCartService,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(AuthController);
  }
}
