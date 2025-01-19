import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestiaSwaggerComposer } from '@nestia/sdk';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const document = await NestiaSwaggerComposer.document(app, {
    openapi: "3.1",
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ]
  });
  SwaggerModule.setup("api", app, document as any);
  await app.listen(3000);
}

bootstrap();
