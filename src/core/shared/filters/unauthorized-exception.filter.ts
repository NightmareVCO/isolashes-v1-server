import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const status = exception.getStatus();
    const message = exception.message;

    response.status(status).send({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: request.body,
    });
  }
}
