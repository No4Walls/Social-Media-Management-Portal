import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PostStatus } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(organizationId: string, filters?: { status?: PostStatus; socialAccountId?: string; campaignId?: string }) {
    return this.prisma.post.findMany({
      where: {
        organizationId,
        ...(filters?.status && { status: filters.status }),
        ...(filters?.socialAccountId && { socialAccountId: filters.socialAccountId }),
        ...(filters?.campaignId && { campaignId: filters.campaignId }),
      },
      include: {
        socialAccount: true,
        creator: { select: { id: true, name: true, avatarUrl: true } },
        analytics: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, organizationId: string) {
    return this.prisma.post.findFirst({
      where: { id, organizationId },
      include: {
        socialAccount: true,
        creator: { select: { id: true, name: true, avatarUrl: true } },
        assignee: { select: { id: true, name: true, avatarUrl: true } },
        campaign: true,
        analytics: true,
        approvals: true,
      },
    });
  }

  async create(
    organizationId: string,
    creatorId: string,
    data: {
      content: string;
      socialAccountId: string;
      mediaUrls?: string[];
      hashtags?: string[];
      scheduledAt?: Date;
      campaignId?: string;
      aiGenerated?: boolean;
    },
  ) {
    return this.prisma.post.create({
      data: {
        organizationId,
        creatorId,
        content: data.content,
        socialAccountId: data.socialAccountId,
        mediaUrls: data.mediaUrls || [],
        hashtags: data.hashtags || [],
        scheduledAt: data.scheduledAt,
        campaignId: data.campaignId,
        aiGenerated: data.aiGenerated || false,
        status: data.scheduledAt ? 'SCHEDULED' : 'DRAFT',
      },
      include: {
        socialAccount: true,
        creator: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
  }

  async update(
    id: string,
    organizationId: string,
    data: {
      content?: string;
      mediaUrls?: string[];
      hashtags?: string[];
      scheduledAt?: Date;
      status?: PostStatus;
      assigneeId?: string;
      campaignId?: string;
    },
  ) {
    return this.prisma.post.update({
      where: { id },
      data,
      include: {
        socialAccount: true,
        creator: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
  }

  async delete(id: string, organizationId: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }

  async getScheduledPosts(organizationId: string, startDate: Date, endDate: Date) {
    return this.prisma.post.findMany({
      where: {
        organizationId,
        status: 'SCHEDULED',
        scheduledAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        socialAccount: true,
      },
      orderBy: { scheduledAt: 'asc' },
    });
  }

  async publish(id: string, platformPostId: string) {
    return this.prisma.post.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
        platformPostId,
      },
    });
  }

  async markFailed(id: string, errorMessage: string) {
    return this.prisma.post.update({
      where: { id },
      data: {
        status: 'FAILED',
        errorMessage,
      },
    });
  }
}
