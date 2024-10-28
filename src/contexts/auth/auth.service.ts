import { PrismaService } from '@database/prisma.service';
import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { compare } from 'bcryptjs';

import { LoginUserDto } from './dto/login-user.dto';

type Roles = 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER';

@Injectable()
export class AuthService {
  constructor(
    private database: ZenstackService,
    private prisma: PrismaService,
  ) {}

  @LogResponse()
  @HandleError()
  async validateUser(data: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      include: { shoppingCart: true },
    });
    if (!user) throw new Error('Wrong credentials');

    const isPasswordValid = await compare(data.password, user.password);
    if (!isPasswordValid) throw new Error('Wrong credentials');

    return user;
  }

  @LogResponse()
  @HandleError()
  async toggleRole(parameters: {
    where: Prisma.UserWhereUniqueInput;
    data: { role: Roles };
  }) {
    const { where, data } = parameters;
    const newRoles = ['CUSTOMER'];
    if (data.role === 'EMPLOYEE') {
      newRoles.push('EMPLOYEE');
    } else if (data.role === 'ADMIN') {
      newRoles.push('ADMIN');
    }

    const updatedUser = await this.prisma.user.update({
      where,
      data: {
        roles: newRoles as Roles[],
      },
    });

    return updatedUser;
  }

  @LogResponse()
  @HandleError()
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) throw new Error('User already exists');
    try {
      await this.database.prisma.user.create({ data });
    } catch {}

    const newUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    const shoppingCart = await this.prisma.shoppingCart.create({
      data: {
        userId: newUser.id,
      },
    });

    await this.prisma.user.update({
      where: { id: newUser.id },
      data: {
        shoppingCart: {
          connect: { id: shoppingCart.id },
        },
      },
    });

    const newUserWithShopping = { ...newUser, shoppingCart };
    return newUserWithShopping;
  }

  @LogResponse()
  @HandleError()
  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: { shoppingCart: true, eyesConditions: true },
    });
    if (!user) throw new Error('User not found');

    const shoppingCart = await this.prisma.shoppingCart.findUnique({
      where: { userId: user.id },
    });

    const userWithShopping = { ...user, shoppingCart };

    return userWithShopping;
  }

  @LogResponse()
  @HandleError()
  async updateUser(parameters: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = parameters;

    return await this.database.prisma.user.update({
      where,
      data,
    });
  }

  @LogResponse()
  @HandleError()
  async findAllUsers(parameters: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = parameters;
    const total = await this.database.prisma.user.count({ where });
    const users = await this.database.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    return { users, total };
  }

  @LogResponse()
  @HandleError()
  async count() {
    return await this.database.prisma.user.count();
  }

  @LogResponse()
  @HandleError()
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.database.prisma.user.delete({ where });
  }
}
