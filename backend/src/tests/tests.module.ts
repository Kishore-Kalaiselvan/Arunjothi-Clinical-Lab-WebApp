import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { Test } from './test.entity';
import { TestParameter } from './test-parameter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, TestParameter]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService],
})
export class TestsModule {}
