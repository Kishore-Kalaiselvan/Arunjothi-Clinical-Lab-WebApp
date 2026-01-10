import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestsModule } from './tests/tests.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { RevenueModule } from './revenue/revenue.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TestsModule,
    ReportsModule,
    AuthModule, // 👈 ADD
    RevenueModule,
  ],
})
export class AppModule {}