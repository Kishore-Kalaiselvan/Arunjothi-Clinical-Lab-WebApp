import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repo: Repository<Report>,
  ) {}

  createReport(data: any) {
    const report = this.repo.create({
      ...data,
      locked: true,
    });
    return this.repo.save(report);
  }

  getAllReports() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
