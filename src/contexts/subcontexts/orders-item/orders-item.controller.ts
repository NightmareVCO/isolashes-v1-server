import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ProductsService } from './../../products/products.service';
import { CreateOrdersItemDto } from './dto/create-orders-item.dto';
import { OrdersItemService } from './orders-item.service';

@Controller('orders-item')
export class OrdersItemController {
  constructor(
    private readonly ordersItemService: OrdersItemService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async create(@Body() createOrdersItemDto: CreateOrdersItemDto) {
    const product = await this.productsService.findOne({
      id: createOrdersItemDto.product,
    });

    const data: Prisma.OrderItemCreateInput = {
      product: {
        connect: { id: product.id },
      },
      quantity: createOrdersItemDto.quantity,
      price: product.promotionPrice
        ? product.promotionPrice * createOrdersItemDto.quantity
        : product.price * createOrdersItemDto.quantity,
      order: {
        connect: { id: createOrdersItemDto.order },
      },
    };

    return await this.ordersItemService.create(data);
  }

  @Get()
  async findAll() {
    return await this.ordersItemService.findAll({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersItemService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersItemService.remove(id);
  }
}
