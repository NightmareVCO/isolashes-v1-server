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

import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategoryService } from './product-category.service';

type FindAllParameters = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProductCategoryWhereUniqueInput;
  where?: Prisma.ProductCategoryWhereInput;
  whereValue?: string;
  order?: Prisma.ProductCategoryOrderByWithRelationInput;
  orderDirection?: 'asc' | 'desc';
};

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  async create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return await this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  async findAll(@Query() parameters: FindAllParameters) {
    const { skip, take, cursor, where, whereValue, order, orderDirection } =
      parameters;
    let skipInt: number | undefined;
    let takeInt: number | undefined;
    if (take) takeInt = +take;
    if (skip) skipInt = +skip;

    return await this.productCategoryService.findAll({
      skip: skipInt,
      take: takeInt,
      cursor,
      where: where ? { [where as string]: { id: whereValue } } : undefined,
      orderBy: order ? { [order as string]: orderDirection } : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productCategoryService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return await this.productCategoryService.update(
      id,
      updateProductCategoryDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productCategoryService.remove(id);
  }
}
