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

import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('user/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    // @ts-expect-error - owner is created by default in zenstack
    return await this.addressService.create(createAddressDto);
  }

  @Get()
  async findAll(@Query('isString') isString: string) {
    const asString = isString === 'true' ? true : false;
    return await this.addressService.findAll(asString);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.addressService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    // @ts-expect-error - owner is created by default in zenstack
    return await this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.addressService.remove(id);
  }
}
