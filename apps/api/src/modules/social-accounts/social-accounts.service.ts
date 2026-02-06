import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Platform } from '@prisma/client';

@Injectable()
export class SocialAccountsService {
  constructor(private prisma: PrismaService) {}

  async findAll(organizationId: string) {
    return this.prisma.socialAccount.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, organizationId: string) {
    return this.prisma.socialAccount.findFirst({
      where: { id, organizationId },
    });
  }

  async connect(
    organizationId: string,
    data: {
      platform: Platform;
      platformAccountId: string;
      username: string;
      displayName?: string;
      avatarUrl?: string;
      accessToken: string;
      refreshToken?: string;
      tokenExpiresAt?: Date;
      scopes: string[];
    },
  ) {
    return this.prisma.socialAccount.upsert({
      where: {
        platform_platformAccountId: {
          platform: data.platform,
          platformAccountId: data.platformAccountId,
        },
      },
      update: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        tokenExpiresAt: data.tokenExpiresAt,
        scopes: data.scopes,
        isActive: true,
      },
      create: {
        organizationId,
        ...data,
      },
    });
  }

  async disconnect(id: string, organizationId: string) {
    return this.prisma.socialAccount.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async refreshToken(id: string, accessToken: string, refreshToken?: string, expiresAt?: Date) {
    return this.prisma.socialAccount.update({
      where: { id },
      data: {
        accessToken,
        refreshToken,
        tokenExpiresAt: expiresAt,
      },
    });
  }

  async updateFollowerCount(id: string, followerCount: number) {
    return this.prisma.socialAccount.update({
      where: { id },
      data: {
        followerCount,
        lastSyncAt: new Date(),
      },
    });
  }

  getOAuthUrl(platform: Platform, redirectUri: string): string {
    const clientIds: Record<Platform, string> = {
      INSTAGRAM: process.env.META_CLIENT_ID || '',
      FACEBOOK: process.env.META_CLIENT_ID || '',
      LINKEDIN: process.env.LINKEDIN_CLIENT_ID || '',
      TWITTER: process.env.TWITTER_CLIENT_ID || '',
      TIKTOK: process.env.TIKTOK_CLIENT_ID || '',
      YOUTUBE: process.env.GOOGLE_CLIENT_ID || '',
    };

    const scopes: Record<Platform, string> = {
      INSTAGRAM: 'instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights',
      FACEBOOK: 'pages_show_list,pages_read_engagement,pages_manage_posts,pages_read_user_content',
      LINKEDIN: 'r_liteprofile,r_emailaddress,w_member_social',
      TWITTER: 'tweet.read,tweet.write,users.read,offline.access',
      TIKTOK: 'user.info.basic,video.list,video.upload',
      YOUTUBE: 'https://www.googleapis.com/auth/youtube.upload,https://www.googleapis.com/auth/youtube.readonly',
    };

    const authUrls: Record<Platform, string> = {
      INSTAGRAM: `https://api.instagram.com/oauth/authorize?client_id=${clientIds.INSTAGRAM}&redirect_uri=${redirectUri}&scope=${scopes.INSTAGRAM}&response_type=code`,
      FACEBOOK: `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientIds.FACEBOOK}&redirect_uri=${redirectUri}&scope=${scopes.FACEBOOK}&response_type=code`,
      LINKEDIN: `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientIds.LINKEDIN}&redirect_uri=${redirectUri}&scope=${scopes.LINKEDIN}&response_type=code`,
      TWITTER: `https://twitter.com/i/oauth2/authorize?client_id=${clientIds.TWITTER}&redirect_uri=${redirectUri}&scope=${scopes.TWITTER}&response_type=code&code_challenge=challenge&code_challenge_method=plain`,
      TIKTOK: `https://www.tiktok.com/auth/authorize/?client_key=${clientIds.TIKTOK}&redirect_uri=${redirectUri}&scope=${scopes.TIKTOK}&response_type=code`,
      YOUTUBE: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientIds.YOUTUBE}&redirect_uri=${redirectUri}&scope=${scopes.YOUTUBE}&response_type=code&access_type=offline`,
    };

    return authUrls[platform];
  }
}
