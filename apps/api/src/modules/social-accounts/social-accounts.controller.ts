import { Controller, Get, Post, Delete, Param, Query, UseGuards, Request } from '@nestjs/common';
import { SocialAccountsService } from './social-accounts.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Platform } from '@prisma/client';

@Controller('social-accounts')
@UseGuards(JwtAuthGuard)
export class SocialAccountsController {
  constructor(private socialAccountsService: SocialAccountsService) {}

  @Get()
  async findAll(@Request() req: { user: { organizationId: string } }) {
    return this.socialAccountsService.findAll(req.user.organizationId);
  }

  @Get(':id')
  async findOne(
    @Request() req: { user: { organizationId: string } },
    @Param('id') id: string,
  ) {
    return this.socialAccountsService.findById(id, req.user.organizationId);
  }

  @Get('oauth/:platform')
  async getOAuthUrl(
    @Param('platform') platform: Platform,
    @Query('redirectUri') redirectUri: string,
  ) {
    return { url: this.socialAccountsService.getOAuthUrl(platform, redirectUri) };
  }

  @Delete(':id')
  async disconnect(
    @Request() req: { user: { organizationId: string } },
    @Param('id') id: string,
  ) {
    return this.socialAccountsService.disconnect(id, req.user.organizationId);
  }
}
