import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShoppingCartService {
  constructor(private database: ZenstackService) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.ShoppingCartCreateInput) {
    return await this.database.prisma.shoppingCart.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll() {
    return await this.database.prisma.shoppingCart.findMany();
  }

  @LogResponse()
  @HandleError()
  async findOne(id: string) {
    return await this.database.prisma.shoppingCart.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  @LogResponse()
  @HandleError()
  async update(id: string, data: Prisma.ShoppingCartUpdateInput) {
    return await this.database.prisma.shoppingCart.update({
      where: { id },
      data,
    });
  }

  @LogResponse()
  @HandleError()
  async remove(id: string) {
    return await this.database.prisma.shoppingCart.delete({
      where: { id },
    });
  }

  @LogResponse()
  @HandleError()
  async addProductToCart(
    shoppingCartId: string,
    productId: string,
    quantity: number,
  ) {
    console.log('quantity', quantity);

    await this.database.prisma.shoppingCart.update({
      where: { id: shoppingCartId },
      data: {
        items: {
          create: {
            product: { connect: { id: productId } },
            quantity,
          },
        },
      },
    });

    return await this.getShoppingCartTotalPricePerItemWithTotalPrice(
      shoppingCartId,
    );
  }

  @LogResponse()
  @HandleError()
  async removeProductFromCart(
    shoppingCartId: string,
    shoppingCartItemId: string,
  ) {
    await this.database.prisma.shoppingCartItem.delete({
      where: { id: shoppingCartItemId },
    });

    return await this.getShoppingCartTotalPricePerItemWithTotalPrice(
      shoppingCartId,
    );
  }

  @LogResponse()
  @HandleError()
  getShoppingCartItemByProductId(shoppingCartId: string, productId: string) {
    return this.database.prisma.shoppingCartItem.findFirst({
      where: { shoppingCartId, productId },
    });
  }

  @LogResponse()
  @HandleError()
  async updateProductInCart(
    shoppingCartId: string,
    shoppingCartItemId: string,
    quantity: number,
  ) {
    await this.database.prisma.shoppingCartItem.update({
      where: { id: shoppingCartItemId },
      data: { quantity },
    });

    return await this.getShoppingCartTotalPricePerItemWithTotalPrice(
      shoppingCartId,
    );
  }

  @LogResponse()
  @HandleError()
  async getShoppingCartItems(shoppingCartId: string) {
    return await this.database.prisma.shoppingCartItem.findMany({
      where: { shoppingCartId },
      include: { product: true },
    });
  }

  @LogResponse()
  @HandleError()
  async clearShoppingCart(shoppingCartId: string) {
    return await this.database.prisma.shoppingCart.update({
      where: { id: shoppingCartId },
      data: { items: { deleteMany: {} } },
    });
  }

  @LogResponse()
  @HandleError()
  async getShoppingCartTotalPrice(shoppingCartId: string) {
    const shoppingCartItems =
      await this.database.prisma.shoppingCartItem.findMany({
        where: { shoppingCartId },
        include: { product: true },
      });

    return shoppingCartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  @LogResponse()
  @HandleError()
  async getShoppingCartTotalItems(shoppingCartId: string) {
    const shoppingCartItems =
      await this.database.prisma.shoppingCartItem.findMany({
        where: { shoppingCartId },
      });

    return shoppingCartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  @LogResponse()
  @HandleError()
  async getShoppingCartTotalItemsAndPrice(shoppingCartId: string) {
    const shoppingCartItems =
      await this.database.prisma.shoppingCartItem.findMany({
        where: { shoppingCartId },
        include: { product: true },
      });

    const totalItems = shoppingCartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    const totalPrice = shoppingCartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    return { totalItems, totalPrice };
  }

  @LogResponse()
  @HandleError()
  async getShoppingCartTotalPricePerItem(shoppingCartId: string) {
    const shoppingCartItems =
      await this.database.prisma.shoppingCartItem.findMany({
        where: { shoppingCartId },
        include: { product: true },
      });

    return shoppingCartItems.map((item) => {
      return {
        product: item.product,
        quantity: item.quantity,
        totalPrice: item.product.price * item.quantity,
      };
    });
  }

  @LogResponse()
  @HandleError()
  async getShoppingCartTotalPricePerItemWithTotalPrice(shoppingCartId: string) {
    const shoppingCartItems =
      await this.database.prisma.shoppingCartItem.findMany({
        where: { shoppingCartId },
        include: {
          product: {
            include: { productImage: true },
          },
        },
      });

    const totalDifferentItems = shoppingCartItems.length;

    const totalPricePerItem = shoppingCartItems.map((item) => {
      return {
        id: item.id,
        product: item.product,
        quantity: item.quantity,
        totalPrice: item.product.isPromotion
          ? item.product.promotionPrice * item.quantity
          : item.product.price * item.quantity,
        isPromotion: item.product.isPromotion,
        price: item.product.price,
        promotionPrice: item.product.promotionPrice,
      };
    });

    const totalPrice = shoppingCartItems.reduce((total, item) => {
      return (
        total +
        (item.product.isPromotion
          ? item.product.promotionPrice * item.quantity
          : item.product.price * item.quantity)
      );
    }, 0);

    return { totalPricePerItem, totalPrice, totalDifferentItems };
  }
}
