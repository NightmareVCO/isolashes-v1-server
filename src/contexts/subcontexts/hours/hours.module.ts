import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { HoursController } from './hours.controller';
import { HoursService } from './hours.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [HoursController],
  providers: [HoursService, Logger, PrismaService, ZenstackService],
  exports: [HoursService],
})
export class HoursModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(HoursController);
  }
}
