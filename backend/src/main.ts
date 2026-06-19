// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common'; // 👈 Added ValidationPipe here

async function bootstrap() {
  const logger = new Logger('EventHub360-Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  // Enable Cross-Origin Resource Sharing for future frontend connectivity
  app.enableCors();

  // 🚀 MUST HAVE THIS: Tells NestJS to validate and transform incoming JSON payloads into DTO instances
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    whitelist: true 
  }));
  
  // Set global API routing prefix
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`🚀 QTN Backend Engine running locally at http://localhost:${port}/api`);
}
bootstrap();