import { ShoppingCartService } from '@contexts/shopping-cart/shopping-cart.service';
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

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserDtoGoogle } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UpdateUserEmailDto,
  UpdateUserIdDto,
} from './dto/update-user-parameters.dto';

type FindAllParameters = {
  skipValue?: number | string;
  takeValue?: number | string;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  whereValue?: string;
  status?: string;
  order?: Prisma.UserOrderByWithRelationInput;
  orderDirection?: 'asc' | 'desc';
  query?: string;
};

type Roles = 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly shoppingCartService: ShoppingCartService,
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const parsedBirthDate = new Date(createUserDto.birthDate);
    createUserDto.birthDate = parsedBirthDate;

    return await this.authService.createUser(createUserDto);
  }

  @Post('signup/google')
  async signUpGoogle(@Body() createUserDto: CreateUserDtoGoogle) {
    createUserDto.google = true;
    return await this.authService.createUser(createUserDto);
  }

  @Post('login')
  async logIn(@Body() LoginUserDto: LoginUserDto) {
    return await this.authService.validateUser(LoginUserDto);
  }

  @Get('user/:data')
  async findUser(@Param() { data }: UpdateUserEmailDto | UpdateUserIdDto) {
    if (data.includes('@')) {
      return await this.authService.findUser({ email: data });
    }
    return await this.authService.findUser({ id: data });
  }

  @Patch('user/:data')
  async update(
    @Param() { data }: UpdateUserIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.authService.updateUser({
      where: { id: data },
      data: updateUserDto,
    });
  }

  @Patch('user/toggle-role/:data')
  async toggleRole(
    @Param() { data }: UpdateUserIdDto,
    @Body() role: { role: Roles },
  ) {
    return await this.authService.toggleRole({
      where: { id: data },
      data: role,
    });
  }

  @Get('users')
  async findAll(@Query() parameters: FindAllParameters) {
    const { skipValue, takeValue, cursor, order, orderDirection, query } =
      parameters;
    const skip = skipValue ? Number.parseInt(skipValue as string) : undefined;
    const take = takeValue ? Number.parseInt(takeValue as string) : undefined;

    const whereQuery: Prisma.UserWhereInput = {
      AND: [
        query
          ? {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { name: { startsWith: query, mode: 'insensitive' } },
                { name: { endsWith: query, mode: 'insensitive' } },
                { name: { equals: query, mode: 'insensitive' } },
                { email: { startsWith: query, mode: 'insensitive' } },
                { email: { endsWith: query, mode: 'insensitive' } },
                { email: { contains: query, mode: 'insensitive' } },
                { email: { equals: query, mode: 'insensitive' } },
                { phone: { startsWith: query, mode: 'insensitive' } },
                { phone: { endsWith: query, mode: 'insensitive' } },
                { phone: { contains: query, mode: 'insensitive' } },
                { phone: { equals: query, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    const orderQuery: Prisma.ProductOrderByWithRelationInput = {
      [order as string]: orderDirection,
    };

    return await this.authService.findAllUsers({
      skip,
      take,
      cursor,
      where: whereQuery,
      orderBy: orderQuery,
    });
  }

  @Get('user/count')
  async count() {
    return await this.authService.count();
  }

  @Delete('user/:id')
  async delete(@Param('id') id: string) {
    return await this.authService.deleteUser({ id });
  }
}
