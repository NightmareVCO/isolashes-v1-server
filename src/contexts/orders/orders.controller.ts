import { ProductsService } from '@contexts/products/products.service';
import { ReceiptService } from '@contexts/receipt/receipt.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OrdersItemService } from '@subcontexts/orders-item/orders-item.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

type FindAllParameters = {
  skipValue?: number | string;
  takeValue?: number | string;
  cursor?: Prisma.OrderWhereUniqueInput;
  where?: Prisma.OrderWhereInput;
  whereValue?: string;
  status?: string;
  order?: Prisma.OrderOrderByWithRelationInput;
  orderDirection?: 'asc' | 'desc';
  query?: string;
};

type RealProduct = {
  id: string;
  quantity: number;
  isPromotion: boolean;
  promotionPrice: number;
  price: number;
};

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly ordersItemService: OrdersItemService,
    private readonly receiptService: ReceiptService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createOrderDto: CreateOrderDto) {
    const { products, ...rest } = createOrderDto;
    const realProducts: RealProduct[] = JSON.parse(products);

    const orderData: Prisma.OrderCreateInput = {
      ...rest,
      user: createOrderDto.user
        ? {
            connect: { id: createOrderDto.user },
          }
        : {},
      address: createOrderDto.address
        ? {
            connect: { id: createOrderDto.address },
          }
        : {},
      receipt: createOrderDto.receipt
        ? { connect: { id: createOrderDto.receipt } }
        : {},
      dateOrdered: new Date(createOrderDto.dateOrdered),
      dateDelivered: createOrderDto.dateDelivered
        ? new Date(createOrderDto?.dateDelivered)
        : undefined,
      dateCompleted: createOrderDto.dateCompleted
        ? new Date(createOrderDto?.dateCompleted)
        : undefined,
    };

    const order = await this.ordersService.create(orderData);

    for (const product of realProducts) {
      const data: Prisma.OrderItemCreateInput = {
        product: {
          connect: { id: product.id },
        },
        quantity: product.quantity,
        price: product.isPromotion
          ? product.promotionPrice * product.quantity
          : product.price * product.quantity,
        order: {
          connect: { id: order.id },
        },
      };

      await this.ordersItemService.create(data);
    }

    const updatedOrder = await this.ordersService.findOne({ id: order.id });

    for (const product of updatedOrder.products)
      await this.productsService.removeInventory({
        where: { id: product.productId },
        quantity: product.quantity,
      });

    return order;
  }

  @Patch('receipt')
  async joinReceipt(@Body() data: { orderId: string; receiptId: string }) {
    const { orderId, receiptId } = data;

    const receipt = await this.receiptService.update({
      where: { id: receiptId },
      data: {
        order: {
          connect: { id: orderId },
        },
      },
    });

    const order = await this.ordersService.update({
      where: { id: orderId },
      data: {
        receipt: {
          connect: { id: receipt.id },
        },
      },
    });

    return { order, receipt };
  }

  @Get()
  async findAll(@Query() parameters: FindAllParameters) {
    const {
      skipValue,
      takeValue,
      cursor,
      order,
      orderDirection,
      where,
      whereValue,
      query,
    } = parameters;

    const skip = skipValue ? Number.parseInt(skipValue as string) : undefined;
    const take = takeValue ? Number.parseInt(takeValue as string) : undefined;
    const orderBy = order ? { [order as string]: orderDirection } : undefined;

    const whereQuery = {
      AND: [
        where
          ? {
              [where as string]: {
                equals: whereValue === 'true' ? true : false,
              },
            }
          : {},
        query
          ? {
              OR: [
                { user: { name: { contains: query } } },
                { user: { name: { startWith: query } } },
                { user: { name: { endsWith: query } } },
                { user: { name: { equals: query } } },
                { user: { email: { contains: query } } },
                { user: { email: { startWith: query } } },
                { user: { email: { endsWith: query } } },
                { user: { email: { equals: query } } },
                { user: { phone: { contains: query } } },
                { user: { phone: { startWith: query } } },
                { user: { phone: { endsWith: query } } },
                { user: { phone: { equals: query } } },
                { address: { address: { contains: query } } },
                { address: { address: { startWith: query } } },
                { address: { address: { endsWith: query } } },
                { address: { address: { equals: query } } },
                { address: { city: { contains: query } } },
                { address: { city: { startWith: query } } },
                { address: { city: { endsWith: query } } },
                { address: { city: { equals: query } } },
                { address: { state: { contains: query } } },
                { address: { state: { startWith: query } } },
                { address: { state: { endsWith: query } } },
                { address: { state: { equals: query } } },
                { address: { zipCode: { contains: query } } },
                { address: { zipCode: { startWith: query } } },
                { address: { zipCode: { endsWith: query } } },
                { address: { zipCode: { equals: query } } },
                { address: { country: { contains: query } } },
                { address: { country: { startWith: query } } },
                { address: { country: { endsWith: query } } },
                { address: { country: { equals: query } } },
                { userName: { contains: query } },
                { userName: { startWith: query } },
                { userName: { endsWith: query } },
                { userName: { equals: query } },
                { userEmail: { contains: query } },
                { userEmail: { startWith: query } },
                { userEmail: { endsWith: query } },
                { userEmail: { equals: query } },
                { userPhone: { contains: query } },
                { userPhone: { startWith: query } },
                { userPhone: { endsWith: query } },
                { userPhone: { equals: query } },
              ],
            }
          : {},
      ],
    };

    return await this.ordersService.findAll({
      skip,
      take,
      cursor,
      where: whereQuery,
      orderBy,
    });
  }

  @Get('count')
  async count() {
    return await this.ordersService.count();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.OrderUpdateInput) {
    return await this.ordersService.update({ where: { id }, data });
  }
}
