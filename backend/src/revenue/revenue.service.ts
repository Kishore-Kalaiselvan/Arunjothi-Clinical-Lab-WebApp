import { Injectable } from '@nestjs/common';
import { ReportsService } from '../reports/reports.service';

@Injectable()
export class RevenueService {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  async getSummary() {
    // ✅ FIX: await the Promise
    const reports = await this.reportsService.getAllReports();
    const now = new Date();

    let daily = 0;
    let weekly = 0;
    let monthly = 0;

    reports.forEach(r => {
      const date = new Date(r.createdAt);

      // DAILY
      if (date.toDateString() === now.toDateString()) {
        daily += r.totalAmount;
      }

      // WEEKLY (last 7 days)
      if (now.getTime() - date.getTime() <= 7 * 24 * 60 * 60 * 1000) {
        weekly += r.totalAmount;
      }

      // MONTHLY
      if (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      ) {
        monthly += r.totalAmount;
      }
    });

    return { daily, weekly, monthly };
  }
}
