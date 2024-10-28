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

import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategoryService } from './service-category.service';

type FindAllParameters = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ServiceCategoryWhereUniqueInput;
  where?: Prisma.ServiceCategoryWhereInput;
  whereValue?: string;
  order?: Prisma.ServiceCategoryOrderByWithRelationInput;
  orderDirection?: 'asc' | 'desc';
};

@Controller('service-category')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Post()
  async create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
    return await this.serviceCategoryService.create(createServiceCategoryDto);
  }

  @Get()
  async findAll(@Query() parameters: FindAllParameters) {
    const { skip, take, cursor, where, whereValue, order, orderDirection } =
      parameters;

    let skipInt: number | undefined;
    let takeInt: number | undefined;
    if (take) takeInt = +take;
    if (skip) skipInt = +skip;

    return await this.serviceCategoryService.findAll({
      skip: skipInt,
      take: takeInt,
      cursor,
      where: where ? { [where as string]: { id: whereValue } } : undefined,
      orderBy: order ? { [order as string]: orderDirection } : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.serviceCategoryService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceCategoryDto: UpdateServiceCategoryDto,
  ) {
    return await this.serviceCategoryService.update(
      id,
      updateServiceCategoryDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.serviceCategoryService.remove(id);
  }
}
