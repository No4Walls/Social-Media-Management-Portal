import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('generate-content')
  async generateContent(
    @Request() req: { user: { organizationId: string } },
    @Body() data: {
      platform: string;
      topic: string;
      tone?: string;
      includeHashtags?: boolean;
      includeEmojis?: boolean;
      maxLength?: number;
    },
  ) {
    return this.aiService.generateContent(req.user.organizationId, data);
  }

  @Post('generate-caption')
  async generateCaption(
    @Request() req: { user: { organizationId: string } },
    @Body() data: { imageDescription: string; platform: string },
  ) {
    const caption = await this.aiService.generateCaption(
      req.user.organizationId,
      data.imageDescription,
      data.platform,
    );
    return { caption };
  }

  @Post('generate-hashtags')
  async generateHashtags(
    @Request() req: { user: { organizationId: string } },
    @Body() data: { content: string; platform: string; count?: number },
  ) {
    const hashtags = await this.aiService.generateHashtags(
      req.user.organizationId,
      data.content,
      data.platform,
      data.count,
    );
    return { hashtags };
  }

  @Post('generate-reply')
  async generateReply(
    @Request() req: { user: { organizationId: string } },
    @Body() data: { originalMessage: string; sentiment?: string; tone?: string },
  ) {
    const reply = await this.aiService.generateReply(req.user.organizationId, data);
    return { reply };
  }

  @Post('analyze-sentiment')
  async analyzeSentiment(@Body() data: { text: string }) {
    return this.aiService.analyzeSentiment(data.text);
  }

  @Post('suggest-posting-time')
  async suggestBestPostingTime(
    @Request() req: { user: { organizationId: string } },
    @Body() data: { platform: string },
  ) {
    const suggestions = await this.aiService.suggestBestPostingTime(
      req.user.organizationId,
      data.platform,
    );
    return { suggestions };
  }

  @Post('repurpose-content')
  async repurposeContent(
    @Request() req: { user: { organizationId: string } },
    @Body() data: { originalContent: string; fromPlatform: string; toPlatform: string },
  ) {
    const content = await this.aiService.repurposeContent(
      req.user.organizationId,
      data.originalContent,
      data.fromPlatform,
      data.toPlatform,
    );
    return { content };
  }
}
