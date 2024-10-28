import { Injectable } from '@nestjs/common';
import { enhance } from '@zenstackhq/runtime';

import { PrismaService } from '@src/database/prisma.service';

@Injectable()
export class ZenstackService {
  prisma: PrismaService;
  constructor(private database: PrismaService) {}

  createEnhance = async (user) => {
    if (user === null)
      return (this.prisma = enhance(this.database) as PrismaService);

    this.prisma = enhance(this.database, { user }) as PrismaService;
  };

  getUser = async (userId) => {
    const customer = await this.database.user.findUnique({
      where: { id: userId },
    });
    if (customer) return customer;

    return null;
  };

  async init(currentUser: string) {
    if (currentUser == 'default') return this.createEnhance(null);
    const user = await this.getUser(currentUser);
    this.createEnhance(user);
  }
}
