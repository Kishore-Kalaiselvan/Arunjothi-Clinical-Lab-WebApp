import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestsModule } from './tests/tests.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { RevenueModule } from './revenue/revenue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'labuser',
      password: 'labpass',
      database: 'clinicallab',
      autoLoadEntities: true,
      synchronize: true, // ⚠ dev only
    }),

    TestsModule,
    ReportsModule,
    AuthModule,
    RevenueModule,
  ],
})
export class AppModule {}
