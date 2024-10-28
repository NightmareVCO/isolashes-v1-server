import { ZenstackService } from '@database/zenstack.service';
import { HandleError } from '@decorators/handle-error.decorator';
import { LogResponse } from '@decorators/log-response.decorator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class BranchesService {
  constructor(private database: ZenstackService) {}

  @LogResponse()
  @HandleError()
  async create(data: Prisma.BranchCreateInput) {
    return await this.database.prisma.branch.create({ data });
  }

  @LogResponse()
  @HandleError()
  async findAll() {
    return await this.database.prisma.branch.findMany();
  }

  @LogResponse()
  @HandleError()
  async findOne(id: string) {
    return await this.database.prisma.branch.findUnique({ where: { id } });
  }

  @LogResponse()
  @HandleError()
  async count() {
    return await this.database.prisma.branch.count();
  }

  @LogResponse()
  @HandleError()
  async findOneByName(name: string) {
    return await this.database.prisma.branch.findFirst({ where: { name } });
  }

  @LogResponse()
  @HandleError()
  async update(id: string, data: Prisma.BranchUpdateInput) {
    return await this.database.prisma.branch.update({ where: { id }, data });
  }

  @LogResponse()
  @HandleError()
  async remove(id: string) {
    return await this.database.prisma.branch.delete({ where: { id } });
  }
}
