import { IsEnum, IsNotEmpty, MaxLength, Matches, IsEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@user/interface/user.dto';
import { PublicationModeState } from '@publication/interface/publicationMode.state';
import { PublicationPlatformState } from '@publication/interface/publicationPlatform.state';
import { PublicationWritingState } from '@publication/interface/publicationWriting.state';

export class CreatePublicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255, {message: 'Le sujet ne peut contenir plus de 255 caractères'})
  @Matches(/^[a-zA-Z0-9 .,!?'\\"-éèêëàâäôöùûüç]*$/, {message: 'Le sujet ne peut contenir que des lettres, des chiffres et des caractères spéciaux (. , ! ? \' \\" -)'})
  topic: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['sales', 'publication'])
  choice: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PublicationWritingState)
  writingTechnique?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PublicationPlatformState)
  platform: string;

  @ApiProperty()
  @IsEnum(PublicationModeState)
  @IsOptional()
  mode?: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255, {message: 'Le public cible ne peut contenir plus de 255 caractères'})
  @Matches(/^[a-zA-Z0-9 .,!?'\\"-éèêëàâäôöùûüç]*$/, {message: 'Le public cible ne peut contenir que des lettres, des chiffres et des caractères spéciaux (. , ! ? \' \\" -)'})
  targetAudience: string;

  @ApiProperty()
  @IsEmpty()
  tokenPrompt?: number;

  @ApiProperty()
  @IsEmpty()
  tokenCompletion?: number;

  @ApiProperty()
  @IsEmpty()
  openAiResponse?: string;

  @IsEmpty()
  owner?: UserDto;
}