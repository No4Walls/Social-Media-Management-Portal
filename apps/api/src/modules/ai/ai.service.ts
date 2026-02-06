import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

interface GenerateContentOptions {
  platform: string;
  topic: string;
  tone?: string;
  includeHashtags?: boolean;
  includeEmojis?: boolean;
  maxLength?: number;
}

interface GenerateReplyOptions {
  originalMessage: string;
  sentiment?: string;
  tone?: string;
}

@Injectable()
export class AiService {
  private openaiApiKey: string;
  private openaiBaseUrl = 'https://api.openai.com/v1';

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.openaiApiKey = this.configService.get<string>('OPENAI_API_KEY') || '';
  }

  async generateContent(organizationId: string, options: GenerateContentOptions): Promise<{ content: string; hashtags: string[] }> {
    await this.checkCredits(organizationId);

    const prompt = this.buildContentPrompt(options);
    const response = await this.callOpenAI(prompt);
    
    await this.deductCredits(organizationId, 1);

    const content = response.content || '';
    const hashtags = options.includeHashtags ? this.extractHashtags(content) : [];

    return { content, hashtags };
  }

  async generateCaption(organizationId: string, imageDescription: string, platform: string): Promise<string> {
    await this.checkCredits(organizationId);

    const prompt = `Generate a compelling social media caption for ${platform} based on this image description: "${imageDescription}". 
    Make it engaging, include relevant emojis, and optimize for the platform's best practices.
    Keep it concise but impactful.`;

    const response = await this.callOpenAI(prompt);
    await this.deductCredits(organizationId, 1);

    return response.content || '';
  }

  async generateHashtags(organizationId: string, content: string, platform: string, count = 10): Promise<string[]> {
    await this.checkCredits(organizationId);

    const prompt = `Generate ${count} relevant hashtags for this ${platform} post: "${content}".
    Return only the hashtags, one per line, including the # symbol.
    Mix popular and niche hashtags for optimal reach.`;

    const response = await this.callOpenAI(prompt);
    await this.deductCredits(organizationId, 1);

    return (response.content || '')
      .split('\n')
      .map((h: string) => h.trim())
      .filter((h: string) => h.startsWith('#'));
  }

  async generateReply(organizationId: string, options: GenerateReplyOptions): Promise<string> {
    await this.checkCredits(organizationId);

    const prompt = `Generate a ${options.tone || 'professional'} reply to this social media message:
    "${options.originalMessage}"
    
    ${options.sentiment ? `The message sentiment appears to be ${options.sentiment}.` : ''}
    
    Keep the reply helpful, on-brand, and appropriate for public social media.`;

    const response = await this.callOpenAI(prompt);
    await this.deductCredits(organizationId, 1);

    return response.content || '';
  }

  async analyzeSentiment(text: string): Promise<{ sentiment: string; score: number; keywords: string[] }> {
    const prompt = `Analyze the sentiment of this text and respond in JSON format:
    "${text}"
    
    Response format:
    {
      "sentiment": "positive" | "negative" | "neutral",
      "score": 0.0 to 1.0,
      "keywords": ["key", "words", "found"]
    }`;

    const response = await this.callOpenAI(prompt);
    
    try {
      return JSON.parse(response.content || '{"sentiment":"neutral","score":0.5,"keywords":[]}');
    } catch {
      return { sentiment: 'neutral', score: 0.5, keywords: [] };
    }
  }

  async suggestBestPostingTime(organizationId: string, platform: string): Promise<{ day: string; time: string; reason: string }[]> {
    const analyticsData = await this.prisma.analyticsSnapshot.findMany({
      where: { organizationId },
      orderBy: { date: 'desc' },
      take: 30,
    });

    const prompt = `Based on general social media best practices for ${platform}, suggest the top 3 best times to post.
    ${analyticsData.length > 0 ? `Historical engagement data shows average engagement rate of ${analyticsData[0].engagementRate}%.` : ''}
    
    Response format (JSON array):
    [{"day": "Monday", "time": "9:00 AM", "reason": "explanation"}]`;

    const response = await this.callOpenAI(prompt);
    
    try {
      return JSON.parse(response.content || '[]');
    } catch {
      return [
        { day: 'Tuesday', time: '10:00 AM', reason: 'Generally high engagement time' },
        { day: 'Thursday', time: '2:00 PM', reason: 'Mid-week peak activity' },
        { day: 'Saturday', time: '11:00 AM', reason: 'Weekend browsing time' },
      ];
    }
  }

  async repurposeContent(organizationId: string, originalContent: string, fromPlatform: string, toPlatform: string): Promise<string> {
    await this.checkCredits(organizationId);

    const prompt = `Repurpose this ${fromPlatform} content for ${toPlatform}:
    "${originalContent}"
    
    Adapt the tone, length, and format to match ${toPlatform}'s best practices.
    Maintain the core message while optimizing for the new platform.`;

    const response = await this.callOpenAI(prompt);
    await this.deductCredits(organizationId, 1);

    return response.content || '';
  }

  private buildContentPrompt(options: GenerateContentOptions): string {
    return `Generate a social media post for ${options.platform} about: ${options.topic}
    
    Requirements:
    - Tone: ${options.tone || 'professional'}
    - ${options.includeEmojis ? 'Include relevant emojis' : 'No emojis'}
    - ${options.includeHashtags ? 'Include 3-5 relevant hashtags' : 'No hashtags'}
    - Maximum length: ${options.maxLength || 280} characters
    
    Make it engaging and optimized for ${options.platform}'s algorithm.`;
  }

  private async callOpenAI(prompt: string): Promise<{ content: string }> {
    if (!this.openaiApiKey) {
      return { content: 'AI service not configured. Please add OPENAI_API_KEY to environment.' };
    }

    try {
      const response = await fetch(`${this.openaiBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a social media marketing expert helping create engaging content.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return { content: data.choices?.[0]?.message?.content || '' };
    } catch (error) {
      console.error('OpenAI API error:', error);
      return { content: '' };
    }
  }

  private extractHashtags(content: string): string[] {
    const matches = content.match(/#\w+/g);
    return matches || [];
  }

  private async checkCredits(organizationId: string): Promise<void> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { organizationId },
    });

    if (!subscription) {
      throw new Error('No subscription found');
    }

    if (subscription.aiCreditsUsed >= subscription.aiCreditsLimit) {
      throw new Error('AI credits exhausted. Please upgrade your plan.');
    }
  }

  private async deductCredits(organizationId: string, amount: number): Promise<void> {
    await this.prisma.subscription.update({
      where: { organizationId },
      data: {
        aiCreditsUsed: { increment: amount },
      },
    });
  }
}
