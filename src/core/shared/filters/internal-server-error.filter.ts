import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch(InternalServerErrorException)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || 'Internal Server Error';

    response.status(status).send({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: request.body,
    });
  }
}
