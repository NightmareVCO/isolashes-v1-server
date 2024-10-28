import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { EyeConditionController } from './eye-condition.controller';
import { EyeConditionService } from './eye-condition.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [EyeConditionController],
  providers: [EyeConditionService, Logger, PrismaService, ZenstackService],
})
export class EyeConditionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(EyeConditionController);
  }
}
