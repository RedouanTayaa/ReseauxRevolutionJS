import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PublicationChoiceState } from '@publication/interface/publicationChoice.state';
import { AiCompletionResponseDto } from '@publication/interface/aiCompletionResponse.dto';
import { AiCompletionInterface } from '@publication/interface/aiCompletion.interface';

@Injectable()
export class OpenaiCompletionService implements AiCompletionInterface {
  modelName: string = this.configService.get('OPENAI_MODEL_NAME');
  openai = new OpenAI({ apiKey: this.configService.get('OPENAI_API_KEY') });

  constructor(
    private configService: ConfigService,
  ) {
  }

  async postCompletion(options: {
    topic: string;
    choice: string;
    platform: string;
    mode?: string;
    writingTechnique?: string;
    targetAudience: string
  }): Promise<AiCompletionResponseDto> {
    let prompt: string;
    if (options.choice === PublicationChoiceState.SALES) {
      prompt = this.generateSalesPrompt({topic: options.topic, platform: options.platform, writingTechnique: options.writingTechnique});
    } else {
      prompt = this.generatePublicationPrompt({topic: options.topic, platform: options.platform, mode: options.mode, targetAudience: options.targetAudience});
    }

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        { role: 'system', content: 'Vous êtes un assistant spécialisé dans la génération de contenu pour '+options.platform+'.' },
        { role: 'user', content: prompt },
      ],
      model: this.modelName,
    };

    const chatCompletion: OpenAI.Chat.ChatCompletion = await this.openai.chat.completions.create(params);

    return {
      content: chatCompletion.choices[0].message.content,
      tokenPrompt: chatCompletion.usage.prompt_tokens,
      tokenCompletion: chatCompletion.usage.completion_tokens,
    };
  }

  private generatePublicationPrompt(options: {topic: string, platform: string, mode: string, targetAudience: string}): string {
    return 'Tour de passe passe ! Il faut garder secret le prompt';
  }

  private generateSalesPrompt(options: {topic: string, platform: string, writingTechnique: string}): string {
    return 'Tour de passe passe ! Il faut garder secret le prompt';
  }
}
