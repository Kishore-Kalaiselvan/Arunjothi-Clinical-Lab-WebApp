import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 👈 IMPORTANT
  await app.listen(3001); // 👈 CHANGE PORT
}
bootstrap();
