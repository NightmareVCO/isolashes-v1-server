import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  async create(@Body() createBranchDto: CreateBranchDto) {
    return await this.branchesService.create(createBranchDto);
  }

  @Get()
  async findAll() {
    return await this.branchesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.branchesService.findOne(id);
  }

  @Get('count')
  async count() {
    return await this.branchesService.count();
  }

  @Get('name/:name')
  async findOneByName(@Param('name') name: string) {
    name = name.replace('+', ' ');
    return await this.branchesService.findOneByName(name);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    return await this.branchesService.update(id, updateBranchDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.branchesService.remove(id);
  }
}
