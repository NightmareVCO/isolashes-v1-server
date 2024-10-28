import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { ServiceCategoryController } from './service-category.controller';
import { ServiceCategoryService } from './service-category.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService, Logger, PrismaService, ZenstackService],
})
export class ServiceCategoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(ServiceCategoryController);
  }
}
