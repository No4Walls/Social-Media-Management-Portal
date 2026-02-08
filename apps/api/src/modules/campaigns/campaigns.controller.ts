import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CampaignStatus } from '@prisma/client';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @Get()
  async findAll(
    @Request() req: { user: { organizationId: string } },
    @Query('status') status?: CampaignStatus,
  ) {
    return this.campaignsService.findAll(req.user.organizationId, status);
  }

  @Get(':id')
  async findOne(
    @Request() req: { user: { organizationId: string } },
    @Param('id') id: string,
  ) {
    return this.campaignsService.findById(id, req.user.organizationId);
  }

  @Post()
  async create(
    @Request() req: { user: { organizationId: string } },
    @Body() data: {
      name: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      budget?: number;
      goals?: Record<string, unknown>;
    },
  ) {
    return this.campaignsService.create(req.user.organizationId, {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: {
      name?: string;
      description?: string;
      status?: CampaignStatus;
      startDate?: string;
      endDate?: string;
      budget?: number;
      goals?: Record<string, unknown>;
    },
  ) {
    return this.campaignsService.update(id, {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.campaignsService.delete(id);
  }
}
