import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedTests } from './tests/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const dataSource = app.get(DataSource);
  await seedTests(dataSource);

  await app.listen(3001);
}

bootstrap();
