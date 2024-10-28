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

import { AuthService } from '../auth/auth.service';
import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { UpdateCreditCardParameterDto } from './dto/update-credit-card-parameter.dto';

@Controller('user/credit-card')
export class CreditCardController {
  constructor(
    private readonly creditCardService: CreditCardService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createCreditCardDto: CreateCreditCardDto) {
    //@ts-expect-error zenstack default user
    return await this.creditCardService.create(createCreditCardDto);
  }

  @Get()
  async findAll(@Query('isString') isString: string) {
    const asString = isString === 'true' ? true : false;
    return await this.creditCardService.findAll(asString);
  }

  @Get(':id')
  async findOne(@Param() { id }: UpdateCreditCardParameterDto) {
    return await this.creditCardService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param() { id }: UpdateCreditCardParameterDto,
    @Body() updateCreditCardDto: UpdateCreditCardDto,
  ) {
    return await this.creditCardService.update(id, updateCreditCardDto);
  }

  @Delete(':id')
  async remove(@Param() { id }: UpdateCreditCardParameterDto) {
    return await this.creditCardService.remove({ id });
  }
}
