import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './test.entity';
import { TestParameter } from './test-parameter.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepo: Repository<Test>,

    @InjectRepository(TestParameter)
    private readonly paramRepo: Repository<TestParameter>,
  ) {}

  // ========================
  // TESTS
  // ========================

  findAllTests() {
    return this.testRepo.find();
  }

  updatePrice(id: number, price: number) {
    return this.testRepo.update(id, { price });
  }

  // ========================
  // TEST PARAMETERS (ADMIN)
  // ========================

  getParametersByTest(testId: number) {
    return this.paramRepo.find({
      where: {
        test: { id: testId },
      },
      order: {
        displayOrder: 'ASC',
      },
    });
  }

  async addParameter(
    testId: number,
    data: {
      name: string;
      unit?: string;
      referenceRange?: string;
      displayOrder: number;
    },
  ) {
    const test = await this.testRepo.findOneBy({ id: testId });

    if (!test) {
      throw new Error('Test not found');
    }

    const parameter = this.paramRepo.create({
      name: data.name,
      unit: data.unit,
      referenceRange: data.referenceRange,
      displayOrder: data.displayOrder,
      test: test, // 👈 relation handled correctly
    });

    return this.paramRepo.save(parameter);
  }
}
