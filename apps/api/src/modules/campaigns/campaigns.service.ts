import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CampaignStatus } from '@prisma/client';

@Injectable()
export class CampaignsService {
  constructor(private prisma: PrismaService) {}

  async findAll(organizationId: string, status?: CampaignStatus) {
    return this.prisma.campaign.findMany({
      where: {
        organizationId,
        ...(status && { status }),
      },
      include: {
        _count: { select: { posts: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, organizationId: string) {
    return this.prisma.campaign.findFirst({
      where: { id, organizationId },
      include: {
        posts: {
          include: {
            socialAccount: true,
            analytics: true,
          },
        },
      },
    });
  }

  async create(
    organizationId: string,
    data: {
      name: string;
      description?: string;
      startDate?: Date;
      endDate?: Date;
      budget?: number;
      goals?: Record<string, unknown>;
    },
  ) {
    return this.prisma.campaign.create({
      data: {
        organizationId,
        ...data,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      status?: CampaignStatus;
      startDate?: Date;
      endDate?: Date;
      budget?: number;
      goals?: Record<string, unknown>;
    },
  ) {
    return this.prisma.campaign.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.campaign.delete({
      where: { id },
    });
  }
}
