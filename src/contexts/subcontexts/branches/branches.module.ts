import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [BranchesController],
  providers: [BranchesService, Logger, PrismaService, ZenstackService],
  exports: [BranchesService],
})
export class BranchesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(BranchesController);
  }
}
