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

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

type FindAllParameters = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ServiceWhereUniqueInput;
  where?: Prisma.ServiceWhereInput;
  whereValue?: string;
  order?: Prisma.ServiceOrderByWithRelationInput;
  orderDirection?: 'asc' | 'desc';
  query?: string;
};

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const serviceData = {
      ...createServiceDto,
      serviceCategory: { connect: { id: createServiceDto.serviceCategory } },
    };

    return await this.servicesService.create(serviceData);
  }

  @Get()
  async findAll(@Query() parameters: FindAllParameters) {
    const {
      skip,
      take,
      cursor,
      where,
      whereValue,
      order,
      orderDirection,
      query,
    } = parameters;
    let skipInt: number | undefined;
    let takeInt: number | undefined;
    if (take) takeInt = +take;
    if (skip) skipInt = +skip;

    return await this.servicesService.findAll({
      skip: skipInt,
      take: takeInt,
      cursor,
      where: {
        AND: [
          where ? { [where as string]: { id: whereValue } } : {},
          query
            ? {
                OR: [
                  { name: { contains: query, mode: 'insensitive' } },
                  { name: { startsWith: query, mode: 'insensitive' } },
                  { name: { endsWith: query, mode: 'insensitive' } },
                  { name: { equals: query, mode: 'insensitive' } },
                  { description: { contains: query, mode: 'insensitive' } },
                  { description: { startsWith: query, mode: 'insensitive' } },
                  { description: { endsWith: query, mode: 'insensitive' } },
                  { description: { equals: query, mode: 'insensitive' } },
                  {
                    serviceCategory: {
                      OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { name: { startsWith: query, mode: 'insensitive' } },
                        { name: { endsWith: query, mode: 'insensitive' } },
                        { name: { equals: query, mode: 'insensitive' } },
                      ],
                    },
                  },
                ],
              }
            : {},
        ],
      },
      orderBy: order ? { [order as string]: orderDirection } : {},
    });
  }

  @Get('in-category')
  async findAllWithCategory() {
    return await this.servicesService.findAllWithCategory();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.servicesService.findOne(id);
  }

  @Get('count')
  async count() {
    return await this.servicesService.count();
  }

  @Get('name/:name')
  async findOneByName(@Param('name') name: string) {
    name = name.replace('+', ' ');
    return await this.servicesService.findOneByName(name);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const serviceData = {
      ...updateServiceDto,
      serviceCategory: { connect: { id: updateServiceDto.serviceCategory } },
    };
    return await this.servicesService.update(id, serviceData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.servicesService.remove(id);
  }
}
