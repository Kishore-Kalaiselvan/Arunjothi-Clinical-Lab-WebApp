import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  private reports: any[] = []; // 👈 FIX

  createReport(data: any) {
    const report = {
      id: Date.now(),
      ...data,
      createdAt: new Date(),
      locked: true,
    };

    this.reports.push(report);
    return report;
  }

  getAllReports() {
    return this.reports;
  }
}
