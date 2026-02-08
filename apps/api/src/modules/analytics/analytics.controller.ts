import { Controller, Get, Query, Param, UseGuards, Request } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('overview')
  async getOverview(
    @Request() req: { user: { organizationId: string } },
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.analyticsService.getOverview(
      req.user.organizationId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('platform/:socialAccountId')
  async getByPlatform(
    @Request() req: { user: { organizationId: string } },
    @Param('socialAccountId') socialAccountId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.analyticsService.getByPlatform(
      req.user.organizationId,
      socialAccountId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('top-posts')
  async getTopPosts(
    @Request() req: { user: { organizationId: string } },
    @Query('limit') limit?: string,
  ) {
    return this.analyticsService.getTopPosts(
      req.user.organizationId,
      limit ? parseInt(limit, 10) : 10,
    );
  }
}
