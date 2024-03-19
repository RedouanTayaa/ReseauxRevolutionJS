import { AiCompletionResponseDto } from '@publication/interface/aiCompletionResponse.dto';

export interface AiCompletionInterface {
  postCompletion(options: {topic: string, choice: string, platform: string, mode?: string, writingTechnique?: string, targetAudience: string}): Promise<AiCompletionResponseDto>;
}