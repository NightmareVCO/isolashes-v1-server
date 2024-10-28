import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ZenstackService } from '@src/database/zenstack.service';

@Injectable()
export class AddressService {
  constructor(private database: ZenstackService) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.AddressCreateInput) {
    return await this.database.prisma.address.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll(asString: boolean) {
    if (asString) {
      const addresses = await this.database.prisma.address.findMany();
      return addresses.map((address) => {
        return {
          ...address,
          addressString: `${address.country}, ${address.state}, ${address.city}, ${address.street}, ${address.number}, ${address.zipCode}`,
        };
      });
    }

    return await this.database.prisma.address.findMany();
  }

  @LogResponse()
  @HandleError()
  async findOne(id: string) {
    return await this.database.prisma.address.findUnique({ where: { id } });
  }

  @LogResponse()
  @HandleError()
  async update(id: string, data: Prisma.AddressUpdateInput) {
    return await this.database.prisma.address.update({ where: { id }, data });
  }

  @LogResponse()
  @HandleError()
  async remove(id: string) {
    return await this.database.prisma.address.delete({ where: { id } });
  }
}
