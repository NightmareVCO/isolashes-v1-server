import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateEyeConditionDto } from './dto/create-eye-condition.dto';
import { UpdateEyeConditionDto } from './dto/update-eye-condition.dto';
import { EyeConditionService } from './eye-condition.service';

@Controller('eye-condition')
export class EyeConditionController {
  constructor(private readonly eyeConditionService: EyeConditionService) {}

  @Post()
  async create(@Body() createEyeConditionDtos: CreateEyeConditionDto[]) {
    const eyeConditionDataArray = createEyeConditionDtos.map((dto) => ({
      ...dto,
      customer: {
        connect: {
          id: dto.customer,
        },
      },
    }));

    const createdEyeConditions = [];

    for (const data of eyeConditionDataArray) {
      const existingEyeCondition = await this.eyeConditionService.findUnique({
        name: data.name,
        description: data.description,
        customerId: data.customer.connect.id,
      });

      if (!existingEyeCondition) {
        const createdEyeCondition = await this.eyeConditionService.create(data);
        createdEyeConditions.push(createdEyeCondition);
      }
    }

    return createdEyeConditions;
  }

  @Get()
  async findAll() {
    return await this.eyeConditionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eyeConditionService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEyeConditionDto: UpdateEyeConditionDto,
  ) {
    const eyeConditionData = {
      ...updateEyeConditionDto,
      customer: {
        connect: {
          id: updateEyeConditionDto.customer,
        },
      },
    };
    return await this.eyeConditionService.update(id, eyeConditionData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.eyeConditionService.remove(id);
  }
}
