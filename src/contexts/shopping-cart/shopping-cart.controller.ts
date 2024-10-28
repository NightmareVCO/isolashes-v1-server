import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { ProductsService } from '../products/products.service';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    const data = {
      user: { connect: { id: createShoppingCartDto.userId } },
    };

    return this.shoppingCartService.create(data);
  }

  @Get()
  async findAll() {
    return this.shoppingCartService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.shoppingCartService.findOne(id);
  }

  @Post(':id/add-product')
  async addProductToCart(
    @Param('id') shoppingCartId: string,
    @Body() body: AddProductToCartDto,
  ) {
    //check if the product exists
    const shoppingCartItem =
      await this.shoppingCartService.getShoppingCartItemByProductId(
        shoppingCartId,
        body.productId,
      );

    const product = await this.productsService.findOne({ id: body.productId });
    const quantity = shoppingCartItem
      ? shoppingCartItem.quantity + body.quantity
      : body.quantity;
    const realQuantity = quantity > product.stock ? product.stock : quantity;

    if (shoppingCartItem) {
      return this.shoppingCartService.updateProductInCart(
        shoppingCartId,
        shoppingCartItem.id,
        realQuantity,
      );
    }

    return this.shoppingCartService.addProductToCart(
      shoppingCartId,
      body.productId,
      realQuantity,
    );
  }

  @Delete(':cart/remove-product/:id')
  async removeProductFromCart(
    @Param('cart') shoppingCartId: string,
    @Param('id') shoppingCartItemId: string,
  ) {
    return this.shoppingCartService.removeProductFromCart(
      shoppingCartId,
      shoppingCartItemId,
    );
  }

  @Get(':id/get-products')
  async getShoppingCartItems(@Param('id') shoppingCartId: string) {
    return this.shoppingCartService.getShoppingCartItems(shoppingCartId);
  }

  @Delete(':id/clear-cart')
  async clearShoppingCart(@Param('id') shoppingCartId: string) {
    return this.shoppingCartService.clearShoppingCart(shoppingCartId);
  }

  @Get(':id/total-items')
  async getTotalItems(@Param('id') shoppingCartId: string) {
    return this.shoppingCartService.getShoppingCartTotalItems(shoppingCartId);
  }

  @Get(':id/total-price')
  async getTotal(@Param('id') shoppingCartId: string) {
    return this.shoppingCartService.getShoppingCartTotalPrice(shoppingCartId);
  }

  @Get(':id/total-items-and-price')
  async getTotalItemsAndPrice(@Param('id') shoppingCartId: string) {
    return this.shoppingCartService.getShoppingCartTotalItemsAndPrice(
      shoppingCartId,
    );
  }

  @Get(':id/total-price-per-item')
  async getTotalPricePerItem(@Param('id') shoppingCartId: string) {
    return this.shoppingCartService.getShoppingCartTotalPricePerItem(
      shoppingCartId,
    );
  }

  // getShoppingCartTotalPricePerItemWithTotalPrice
  @Get(':id/total-price-per-item-and-total-price')
  async getTotalPricePerItemWithTotalPrice(
    @Param('id') shoppingCartId: string,
  ) {
    return this.shoppingCartService.getShoppingCartTotalPricePerItemWithTotalPrice(
      shoppingCartId,
    );
  }
}
