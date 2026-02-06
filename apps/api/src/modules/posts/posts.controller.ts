import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PostStatus } from '@prisma/client';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll(
    @Request() req: { user: { organizationId: string } },
    @Query('status') status?: PostStatus,
    @Query('socialAccountId') socialAccountId?: string,
    @Query('campaignId') campaignId?: string,
  ) {
    return this.postsService.findAll(req.user.organizationId, { status, socialAccountId, campaignId });
  }

  @Get('scheduled')
  async getScheduled(
    @Request() req: { user: { organizationId: string } },
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.postsService.getScheduledPosts(
      req.user.organizationId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get(':id')
  async findOne(
    @Request() req: { user: { organizationId: string } },
    @Param('id') id: string,
  ) {
    return this.postsService.findById(id, req.user.organizationId);
  }

  @Post()
  async create(
    @Request() req: { user: { userId: string; organizationId: string } },
    @Body() data: {
      content: string;
      socialAccountId: string;
      mediaUrls?: string[];
      hashtags?: string[];
      scheduledAt?: string;
      campaignId?: string;
      aiGenerated?: boolean;
    },
  ) {
    return this.postsService.create(req.user.organizationId, req.user.userId, {
      ...data,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
    });
  }

  @Patch(':id')
  async update(
    @Request() req: { user: { organizationId: string } },
    @Param('id') id: string,
    @Body() data: {
      content?: string;
      mediaUrls?: string[];
      hashtags?: string[];
      scheduledAt?: string;
      status?: PostStatus;
      assigneeId?: string;
      campaignId?: string;
    },
  ) {
    return this.postsService.update(id, req.user.organizationId, {
      ...data,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
    });
  }

  @Delete(':id')
  async delete(
    @Request() req: { user: { organizationId: string } },
    @Param('id') id: string,
  ) {
    return this.postsService.delete(id, req.user.organizationId);
  }
}
