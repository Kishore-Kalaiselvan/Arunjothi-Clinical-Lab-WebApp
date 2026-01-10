import { Injectable } from '@nestjs/common';

@Injectable()
export class TestsService {
  getAllTests() {
    return [
      { id: 1, name: 'CBC', type: 'TABLE', price: 100 },
      { id: 2, name: 'Lipid Profile', type: 'TABLE', price: 100 },
      { id: 3, name: 'HBsAg', type: 'SINGLE', price: 100 },
      { id: 4, name: 'HIV 1 & 2', type: 'SINGLE', price: 100 },
      { id: 5, name: 'Urine Routine', type: 'TABLE', price: 100 },
    ];
  }
}
