import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AuthService } from '@src/contexts/auth/auth.service';
import { ErrorHandlerModule } from '@src/core/general/error-handler/error-handler.module';
import { PrismaService } from '@src/database/prisma.service';
import { ZenstackMiddleware } from '@src/database/zenstack.middleware';
import { ZenstackService } from '@src/database/zenstack.service';

import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [AddressController],
  providers: [AddressService, ZenstackService, AuthService, PrismaService],
})
export class AddressModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(AddressController);
  }
}
