import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.organization.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
        subscription: true,
      },
    });
  }

  async update(id: string, data: { name?: string; timezone?: string; logoUrl?: string }) {
    return this.prisma.organization.update({
      where: { id },
      data,
    });
  }

  async getMembers(organizationId: string) {
    return this.prisma.teamMember.findMany({
      where: { organizationId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async inviteMember(organizationId: string, email: string, role: 'ADMIN' | 'EDITOR' | 'VIEWER') {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.teamMember.create({
      data: {
        organizationId,
        userId: user.id,
        role,
      },
    });
  }

  async removeMember(organizationId: string, userId: string) {
    return this.prisma.teamMember.delete({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
    });
  }
}
