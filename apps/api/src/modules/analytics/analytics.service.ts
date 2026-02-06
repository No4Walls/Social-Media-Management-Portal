import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getOverview(organizationId: string, startDate: Date, endDate: Date) {
    const snapshots = await this.prisma.analyticsSnapshot.findMany({
      where: {
        organizationId,
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: 'desc' },
    });

    const totals = snapshots.reduce(
      (acc, s) => ({
        totalReach: acc.totalReach + s.totalReach,
        totalImpressions: acc.totalImpressions + s.totalImpressions,
        totalEngagement: acc.totalEngagement + s.totalEngagement,
      }),
      { totalReach: 0, totalImpressions: 0, totalEngagement: 0 },
    );

    return {
      ...totals,
      snapshots,
    };
  }

  async getByPlatform(organizationId: string, socialAccountId: string, startDate: Date, endDate: Date) {
    return this.prisma.analyticsSnapshot.findMany({
      where: {
        organizationId,
        socialAccountId,
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: 'asc' },
    });
  }

  async getTopPosts(organizationId: string, limit = 10) {
    return this.prisma.post.findMany({
      where: {
        organizationId,
        status: 'PUBLISHED',
        analytics: { isNot: null },
      },
      include: {
        socialAccount: true,
        analytics: true,
      },
      orderBy: {
        analytics: { engagementRate: 'desc' },
      },
      take: limit,
    });
  }

  async recordSnapshot(
    organizationId: string,
    socialAccountId: string,
    data: {
      followers: number;
      following: number;
      totalPosts: number;
      totalReach: number;
      totalImpressions: number;
      totalEngagement: number;
      engagementRate: number;
    },
  ) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.analyticsSnapshot.upsert({
      where: {
        organizationId_socialAccountId_date: {
          organizationId,
          socialAccountId,
          date: today,
        },
      },
      update: data,
      create: {
        organizationId,
        socialAccountId,
        date: today,
        ...data,
      },
    });
  }
}
