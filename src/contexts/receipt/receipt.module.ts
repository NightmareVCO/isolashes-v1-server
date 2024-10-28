import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [ReceiptController],
  providers: [ReceiptService, Logger, PrismaService, ZenstackService],
})
export class ReceiptModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(ReceiptController);
  }
}
