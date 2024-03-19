import { PublicationEntity } from '@publication/entity/publication.entity';
import { PublicationDto } from '@publication/interface/publication.dto';

export const toPublicationDto = (data: PublicationEntity): PublicationDto => {
  const { id, openAiResponse, platform } = data;
  return { id, openAiResponse, platform };
};