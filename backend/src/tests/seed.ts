import { DataSource } from 'typeorm';
import { Test } from './test.entity';

export async function seedTests(dataSource: DataSource) {
  const repo = dataSource.getRepository(Test);

  const count = await repo.count();
  if (count > 0) return;

  await repo.save([
    { name: 'CBC', type: 'TABLE', price: 100 },
    { name: 'Lipid Profile', type: 'TABLE', price: 100 },
    { name: 'HBsAg', type: 'SINGLE', price: 100 },
    { name: 'HIV 1 & 2', type: 'SINGLE', price: 100 },
    { name: 'Urine Routine', type: 'TABLE', price: 100 },
  ]);
}
