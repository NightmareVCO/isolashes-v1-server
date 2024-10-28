import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ErrorHandlerModule } from '@src/core/general/error-handler/error-handler.module';
import { PrismaService } from '@src/database/prisma.service';
import { ZenstackMiddleware } from '@src/database/zenstack.middleware';
import { ZenstackService } from '@src/database/zenstack.service';

import { AuthService } from '../auth/auth.service';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [CreditCardController],
  providers: [CreditCardService, PrismaService, ZenstackService, AuthService],
})
export class CreditCardModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(CreditCardController);
  }
}
