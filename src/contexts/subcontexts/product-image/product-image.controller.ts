import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ProductImageService } from './product-image.service';

type ProductImageDataType = {
  url: string;
  product: { connect: { id: string } };
};

@Controller('product-image')
export class ProductImageController {
  constructor(private readonly productImagesService: ProductImageService) {}

  @Post()
  async create(@Body() createProductImageDto: CreateProductImageDto) {
    const data: ProductImageDataType = {
      ...createProductImageDto,
      product: { connect: { id: createProductImageDto.product } },
    };
    return await this.productImagesService.create(data);
  }

  @Get()
  async findAll() {
    return await this.productImagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productImagesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    const data = {
      ...updateProductImageDto,
      product: { connect: { id: updateProductImageDto.product } },
    };
    return await this.productImagesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productImagesService.remove(id);
  }
}
