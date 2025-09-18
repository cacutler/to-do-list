import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'http://localhost:3000',  // Nuxt dev server default
      'http://localhost:3001',  // Alternative Nuxt port
      'http://localhost:8001',  // Your current Nuxt port
      'http://127.0.0.1:8001',  // Alternative localhost
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true,
  });

  // Optional: Add global API prefix
  app.setGlobalPrefix('api');
  
  await app.listen(3001);
  console.log('Backend running on http://localhost:3001');
}
bootstrap();