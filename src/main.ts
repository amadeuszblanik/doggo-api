/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { DEFAULT_PORT } from './config';
import { PasswordProtectionInterceptor } from './interceptors/password-protection.interceptor';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new PasswordProtectionInterceptor());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Language',
    exposedHeaders: 'Authorization',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Doggo API')
    .setDescription('Open version of Doggo API')
    .setVersion('INDEV')
    .setBasePath('api')
    .addTag('auth')
    .addTag('pets')
    .addBearerAuth()
    .build();

  const swaggerOptions: Record<string, any> = {
    persistAuthorization: true,
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions,
  });

  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
};

void bootstrap();
