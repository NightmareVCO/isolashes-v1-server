import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateShoppingCartItemDto } from './dto/create-shopping-cart-item.dto';
import { UpdateShoppingCartItemDto } from './dto/update-shopping-cart-item.dto';
import { ShoppingCartItemService } from './shopping-cart-item.service';

@Controller('shopping-cart-item')
export class ShoppingCartItemController {
  constructor(
    private readonly shoppingCartItemService: ShoppingCartItemService,
  ) {}

  @Post()
  async create(@Body() createShoppingCartItemDto: CreateShoppingCartItemDto) {
    const data = {
      ...createShoppingCartItemDto,
      shoppingCart: { connect: { id: createShoppingCartItemDto.shoppingCart } },
      product: { connect: { id: createShoppingCartItemDto.product } },
    };

    return this.shoppingCartItemService.create(data);
  }

  @Get()
  async findAll() {
    return this.shoppingCartItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.shoppingCartItemService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShoppingCartItemDto: UpdateShoppingCartItemDto,
  ) {
    const data = {
      ...updateShoppingCartItemDto,
      shoppingCart: { connect: { id: updateShoppingCartItemDto.shoppingCart } },
      product: { connect: { id: updateShoppingCartItemDto.product } },
    };
    return this.shoppingCartItemService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.shoppingCartItemService.remove(id);
  }
}
