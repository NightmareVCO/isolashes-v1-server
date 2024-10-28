import { LogResponse } from '@decorators/log-response.decorator';
import { Controller, Get, Inject, Logger } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  @Get()
  @LogResponse()
  run() {
    return { status: 'ok' };
  }
}
