import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [ServicesController],
  providers: [ServicesService, Logger, PrismaService, ZenstackService],
  exports: [ServicesService],
})
export class ServicesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(ServicesController);
  }
}
