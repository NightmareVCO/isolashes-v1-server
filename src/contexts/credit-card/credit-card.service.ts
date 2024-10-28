import { Injectable } from '@nestjs/common';
import { CreditCard, Prisma } from '@prisma/client';

import { HandleError } from '@src/core/shared/decorators/handle-error.decorator';
import { LogResponse } from '@src/core/shared/decorators/log-response.decorator';
import { PrismaService } from '@src/database/prisma.service';
import { ZenstackService } from '@src/database/zenstack.service';

@Injectable()
export class CreditCardService {
  constructor(
    private database: ZenstackService,
    private prisma: PrismaService,
  ) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.CreditCardCreateInput) {
    return await this.database.prisma.creditCard.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll(asString: boolean) {
    const userCreditCards = await this.database.prisma.creditCard.findMany();

    //we need to unhashed the credit card number, we have bcrypt to do that

    if (asString) {
      return userCreditCards.map((creditCard: CreditCard) => {
        return {
          ...creditCard,
          cardString: `${creditCard.number}, ${creditCard.expiration}`,
        };
      });
    }
  }

  @LogResponse()
  @HandleError()
  async findOne(id: string) {
    return await this.database.prisma.creditCard.findUnique({ where: { id } });
  }

  @LogResponse()
  @HandleError()
  async update(id: string, data: Prisma.CreditCardUpdateInput) {
    return await this.database.prisma.creditCard.update({
      where: { id },
      data,
    });
  }

  @LogResponse()
  @HandleError()
  async remove(where: Prisma.CreditCardWhereUniqueInput) {
    return await this.database.prisma.creditCard.delete({ where });
  }
}
