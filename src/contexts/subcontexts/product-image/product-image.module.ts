import { ProductsService } from '@contexts/products/products.service';
import { PrismaService } from '@database/prisma.service';
import { ZenstackMiddleware } from '@database/zenstack.middleware';
import { ZenstackService } from '@database/zenstack.service';
import { ErrorHandlerModule } from '@error-handler/error-handler.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ProductImageController } from './product-image.controller';
import { ProductImageService } from './product-image.service';

@Module({
  imports: [ErrorHandlerModule],
  controllers: [ProductImageController],
  providers: [
    ProductImageService,
    ProductsService,
    ZenstackService,
    PrismaService,
  ],
  exports: [ProductImageService],
})
export class ProductImageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ZenstackMiddleware).forRoutes(ProductImageController);
  }
}
