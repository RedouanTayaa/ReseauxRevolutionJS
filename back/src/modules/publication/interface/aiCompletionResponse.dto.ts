export class AiCompletionResponseDto {
  readonly content: string;
  readonly tokenPrompt: number;
  readonly tokenCompletion: number;
}