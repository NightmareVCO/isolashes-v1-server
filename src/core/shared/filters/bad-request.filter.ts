import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestErrorFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const status = exception.getStatus() || HttpStatus.BAD_REQUEST;

    let message = 'Bad Request';
    const excResponse = exception.getResponse();
    if (typeof excResponse === 'object' && excResponse !== null) {
      message = (excResponse as any).message || message;
    } else if (typeof excResponse === 'string') {
      message = excResponse;
    }

    response.status(status).send({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: request.body,
    });
  }
}
