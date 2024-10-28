import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateHourDto } from './dto/create-hour.dto';
import { UpdateHourDto } from './dto/update-hour.dto';
import { HoursService } from './hours.service';

@Controller('hours')
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @Post()
  async create(@Body() createHourDto: CreateHourDto) {
    return await this.hoursService.create(createHourDto);
  }

  @Get()
  async findAll() {
    return await this.hoursService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.hoursService.findOne(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    //will arrive like: 8%3A00+AM+-+9%3A00+AM parse ir like 8:00 AM - 9:00 AM
    name = decodeURIComponent(name);
    // this will get us: 8:00+AM+-+9:00+AM so we need to replace the + with a space
    name = name.replaceAll('+', ' ');
    return await this.hoursService.findByName(name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateHourDto: UpdateHourDto) {
    return await this.hoursService.update(id, updateHourDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.hoursService.remove(id);
  }
}
