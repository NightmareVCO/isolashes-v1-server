import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { BranchesService } from '@subcontexts/branches/branches.service';
import { HoursService } from '@subcontexts/hours/hours.service';

import { ServicesService } from '../services/services.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    Logger,
    PrismaService,
    ZenstackService,
    HoursService,
    BranchesService,
    ServicesService,
  ],
})
export class AppointmentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(AppointmentsController);
  }
}
