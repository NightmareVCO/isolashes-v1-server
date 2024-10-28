import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { ZenstackService } from './zenstack.service';

@Injectable()
export class ZenstackMiddleware implements NestMiddleware {
  constructor(private readonly zenstackService: ZenstackService) {}

  async use(request: Request, _response: Response, next: NextFunction) {
    let userId = request.headers['user-id'];
    console.log('userId', userId);
    if (
      userId === undefined ||
      (Array.isArray(userId) && userId.length === 0)
    ) {
      await this.zenstackService.init('default');
    } else {
      if (Array.isArray(userId)) {
        userId = userId[0];
      }
      await this.zenstackService.init(userId);
    }
    next();
  }
}
