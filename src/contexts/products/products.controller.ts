import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductCategoryService } from '@subcontexts/product-category/product-category.service';

import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductParameterDto } from './dto/update-product-parameter.dto';
import { ProductsService } from './products.service';

type ProductDataType = {
  name: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  productCategory: { connect: { id: string } };
};

type FindAllParameters = {
  skipValue?: number | string;
  takeValue?: number | string;
  cursor?: Prisma.ProductWhereUniqueInput;
  where?: Prisma.ProductWhereInput;
  whereValue?: string;
  status?: string;
  order?: Prisma.ProductOrderByWithRelationInput;
  orderDirection?: 'asc' | 'desc';
  query?: string;
};

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly shoppingCartService: ShoppingCartService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const productData: ProductDataType = {
      ...createProductDto,
      productCategory: { connect: { id: createProductDto.productCategory } },
    };
    return await this.productsService.create(productData);
  }

  @Get('count')
  async count() {
    return await this.productsService.count();
  }

  @Get()
  async findAll(@Query() parameters: FindAllParameters) {
    const {
      skipValue,
      takeValue,
      cursor,
      where,
      whereValue,
      order,
      orderDirection,
      status,
      query,
    } = parameters;
    const skip = skipValue ? Number.parseInt(skipValue as string) : undefined;
    const take = takeValue ? Number.parseInt(takeValue as string) : undefined;
    let isNewBoolean = null;
    let isPromotionBoolean = null;
    let whereValueId = null;

    if (status === 'Nuevos') {
      isPromotionBoolean = false;
      isNewBoolean = true;
    } else if (status === 'En Oferta') {
      isNewBoolean = false;
      isPromotionBoolean = true;
    }

    if (where && whereValue) {
      whereValueId =
        await this.productCategoryService.findOneByName(whereValue);
    }

    const whereQuery: Prisma.ProductWhereInput = {
      AND: [
        isNewBoolean === null ? {} : { isNew: isNewBoolean },
        isPromotionBoolean === null ? {} : { isPromotion: isPromotionBoolean },
        whereValueId ? { [where as string]: { id: whereValueId.id } } : {},
        query
          ? {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { name: { startsWith: query, mode: 'insensitive' } },
                { name: { endsWith: query, mode: 'insensitive' } },
                { name: { equals: query, mode: 'insensitive' } },
                {
                  productCategory: {
                    name: { contains: query, mode: 'insensitive' },
                  },
                },
                {
                  productCategory: {
                    name: { startsWith: query, mode: 'insensitive' },
                  },
                },
                {
                  productCategory: {
                    name: { endsWith: query, mode: 'insensitive' },
                  },
                },
                {
                  productCategory: {
                    name: { equals: query, mode: 'insensitive' },
                  },
                },
                { description: { startsWith: query, mode: 'insensitive' } },
                { description: { endsWith: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { description: { equals: query, mode: 'insensitive' } },
                { description: { startsWith: query, mode: 'insensitive' } },
                { description: { endsWith: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { description: { equals: query, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    const orderQuery: Prisma.ProductOrderByWithRelationInput = {
      [order as string]: orderDirection,
    };

    return await this.productsService.findAll({
      skip,
      take,
      cursor,
      where: whereQuery,
      orderBy: orderQuery,
    });
  }

  @Get('actives')
  async findAllActive(@Query() parameters: FindAllParameters) {
    const {
      skipValue,
      takeValue,
      cursor,
      where,
      whereValue,
      order,
      orderDirection,
      status,
      query,
    } = parameters;
    const skip = skipValue ? Number.parseInt(skipValue as string) : undefined;
    const take = takeValue ? Number.parseInt(takeValue as string) : undefined;
    let isNewBoolean = null;
    let isPromotionBoolean = null;
    let whereValueId = null;

    if (status === 'Nuevos') {
      isPromotionBoolean = false;
      isNewBoolean = true;
    } else if (status === 'En Oferta') {
      isNewBoolean = false;
      isPromotionBoolean = true;
    }

    if (where && whereValue) {
      whereValueId =
        await this.productCategoryService.findOneByName(whereValue);
    }

    const whereQuery: Prisma.ProductWhereInput = {
      AND: [
        isNewBoolean === null ? {} : { isNew: isNewBoolean },
        isPromotionBoolean === null ? {} : { isPromotion: isPromotionBoolean },
        whereValueId ? { [where as string]: { id: whereValueId.id } } : {},
        { status: true },
        { stock: { gt: 0 } },
        query
          ? {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { name: { startsWith: query, mode: 'insensitive' } },
                { name: { endsWith: query, mode: 'insensitive' } },
                { name: { equals: query, mode: 'insensitive' } },
                { description: { startsWith: query, mode: 'insensitive' } },
                { description: { endsWith: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { description: { equals: query, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    const orderQuery: Prisma.ProductOrderByWithRelationInput = {
      [order as string]: orderDirection,
    };

    return await this.productsService.findAll({
      skip,
      take,
      cursor,
      where: whereQuery,
      orderBy: orderQuery,
    });
  }

  @Get(':id')
  async findOne(@Param() { id }: UpdateProductParameterDto) {
    return await this.productsService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Param() { id }: UpdateProductParameterDto,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update({
      where: { id },
      data: {
        ...updateProductDto,
        productCategory: { connect: { id: updateProductDto.productCategory } },
      },
    });
  }

  @Patch('add-inventory/:id')
  async addInventory(
    @Param() { id }: UpdateProductParameterDto,
    @Body() { quantity }: { quantity: number },
  ) {
    return await this.productsService.addInventory({ where: { id }, quantity });
  }

  @Patch('remove-inventory/:id')
  async removeInventory(
    @Param() { id }: UpdateProductParameterDto,
    @Body() { quantity }: { quantity: number },
  ) {
    return await this.productsService.removeInventory({
      where: { id },
      quantity,
    });
  }

  @Delete(':id')
  async remove(@Param() { id }: UpdateProductParameterDto) {
    return await this.productsService.remove({ id });
  }
}
