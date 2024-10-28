import { AppointmentsModule } from '@contexts/appointments/appointments.module';
import { AuthModule } from '@contexts/auth/auth.module';
import { CreditCardModule } from '@contexts/credit-card/credit-card.module';
import { OrdersModule } from '@contexts/orders/orders.module';
import { ProductsModule } from '@contexts/products/products.module';
import { ReceiptModule } from '@contexts/receipt/receipt.module';
import { ServicesModule } from '@contexts/services/services.module';
import { ShoppingCartModule } from '@contexts/shopping-cart/shopping-cart.module';
import { AddressModule } from '@contexts/subcontexts/address/address.module';
import { EyeConditionModule } from '@contexts/subcontexts/eye-condition/eye-condition.module';
import { PrismaService } from '@database/prisma.service';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { BadRequestErrorFilter } from '@filters/bad-request.filter';
import { InternalServerErrorFilter } from '@filters/internal-server-error.filter';
import { UnauthorizedExceptionFilter } from '@filters/unauthorized-exception.filter';
import { HealthModule } from '@health/health.module';
import { LoggerModule } from '@logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { BranchesModule } from '@subcontexts/branches/branches.module';
import { HoursModule } from '@subcontexts/hours/hours.module';
import { ProductCategoryModule } from '@subcontexts/product-category/product-category.module';
import { ProductImageModule } from '@subcontexts/product-image/product-image.module';
import { ServiceCategoryModule } from '@subcontexts/service-category/service-category.module';
import { ShoppingCartItemModule } from '@subcontexts/shopping-cart-item/shopping-cart-item.module';

import { OrdersItemModule } from './contexts/subcontexts/orders-item/orders-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    LoggerModule,
    HealthModule,
    ErrorHandlerModule,
    AppointmentsModule,
    HoursModule,
    BranchesModule,
    ServicesModule,
    AuthModule,
    ServiceCategoryModule,
    ProductCategoryModule,
    ProductsModule,
    ProductImageModule,
    ShoppingCartModule,
    ShoppingCartItemModule,
    CreditCardModule,
    AddressModule,
    EyeConditionModule,
    OrdersModule,
    ReceiptModule,
    OrdersItemModule,
  ],
  providers: [
    PrismaService,
    ZenstackService,
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestErrorFilter,
    },
  ],
})
export class AppModule {}
