import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  constructor(private readonly logger: Logger) {}

  handle(error: Error) {
    this.logger.error(`Handling error: ${error.message}`);
    throw new InternalServerErrorException(`Error: ${error.message}`);
  }
}
