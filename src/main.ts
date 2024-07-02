import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: [
      '*',
      'http://localhost:3000',
      'http://localhost:3020',
      'http://207.154.214.237:3020',
    ],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'OPTIONS', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
    optionsSuccessStatus: 204,
  });

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const options = new DocumentBuilder()
    .setTitle('a rest api for journal')
    .setDescription('a nestjs api to do crud')
    .setVersion('1.0.0')
    .addTag('nestjsapi')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      schemes: ['http'],
    },
  });

  await app.listen(3007);
}
bootstrap();
