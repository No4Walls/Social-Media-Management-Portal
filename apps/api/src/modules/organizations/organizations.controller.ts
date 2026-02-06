import { Controller, Get, Patch, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get('current')
  async getCurrent(@Request() req: { user: { organizationId: string } }) {
    return this.organizationsService.findById(req.user.organizationId);
  }

  @Patch('current')
  async update(
    @Request() req: { user: { organizationId: string } },
    @Body() data: { name?: string; timezone?: string; logoUrl?: string },
  ) {
    return this.organizationsService.update(req.user.organizationId, data);
  }

  @Get('current/members')
  async getMembers(@Request() req: { user: { organizationId: string } }) {
    return this.organizationsService.getMembers(req.user.organizationId);
  }

  @Post('current/members')
  async inviteMember(
    @Request() req: { user: { organizationId: string } },
    @Body() data: { email: string; role: 'ADMIN' | 'EDITOR' | 'VIEWER' },
  ) {
    return this.organizationsService.inviteMember(req.user.organizationId, data.email, data.role);
  }

  @Delete('current/members/:userId')
  async removeMember(
    @Request() req: { user: { organizationId: string } },
    @Param('userId') userId: string,
  ) {
    return this.organizationsService.removeMember(req.user.organizationId, userId);
  }
}
