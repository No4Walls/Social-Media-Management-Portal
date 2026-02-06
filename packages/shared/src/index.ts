export const PLATFORMS = ['INSTAGRAM', 'FACEBOOK', 'LINKEDIN', 'TWITTER', 'TIKTOK', 'YOUTUBE'] as const;
export type Platform = typeof PLATFORMS[number];

export const POST_STATUSES = ['DRAFT', 'SCHEDULED', 'PUBLISHING', 'PUBLISHED', 'FAILED'] as const;
export type PostStatus = typeof POST_STATUSES[number];

export const CAMPAIGN_STATUSES = ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'] as const;
export type CampaignStatus = typeof CAMPAIGN_STATUSES[number];

export const USER_ROLES = ['OWNER', 'ADMIN', 'EDITOR', 'VIEWER'] as const;
export type UserRole = typeof USER_ROLES[number];

export const SUBSCRIPTION_TIERS = ['STARTER', 'GROWTH', 'PRO', 'ENTERPRISE'] as const;
export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[number];

export interface PlatformConfig {
  id: Platform;
  name: string;
  color: string;
  maxPostLength: number;
}

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  INSTAGRAM: { id: 'INSTAGRAM', name: 'Instagram', color: '#E4405F', maxPostLength: 2200 },
  FACEBOOK: { id: 'FACEBOOK', name: 'Facebook', color: '#1877F2', maxPostLength: 63206 },
  LINKEDIN: { id: 'LINKEDIN', name: 'LinkedIn', color: '#0A66C2', maxPostLength: 3000 },
  TWITTER: { id: 'TWITTER', name: 'X (Twitter)', color: '#000000', maxPostLength: 280 },
  TIKTOK: { id: 'TIKTOK', name: 'TikTok', color: '#000000', maxPostLength: 2200 },
  YOUTUBE: { id: 'YOUTUBE', name: 'YouTube', color: '#FF0000', maxPostLength: 5000 },
};
