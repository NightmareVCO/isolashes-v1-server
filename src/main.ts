import helmet from '@fastify/helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';

import { AppModule } from '@src/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true,
      },
    },
  );
  await app.register(helmet);
  const port = process.env.PORT || 3001;

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, '0.0.0.0');

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}
bootstrap().catch((error) => {
  Logger.error(`Failed to start the app`, error);
});
