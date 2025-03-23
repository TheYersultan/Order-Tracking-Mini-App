import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',  
    allowedHeaders: 'Content-Type,Authorization', 
    credentials: true, 
  });

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  await app.listen(3000);
}
bootstrap();
