import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicationEntity } from '@publication/entity/publication.entity';
import { OpenaiCompletionService } from '@publication/service/openaiCompletion.service';
import { CreatePublicationDto } from '@publication/interface/publication.create.dto';
import { toPublicationDto } from '@shared/mapper/publication.mapper';
import { PublicationDto } from '@publication/interface/publication.dto';
import { UserDto } from '@user/interface/user.dto';
import { UserService } from '@user/service/user.service';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(PublicationEntity)
    private publicationsRepository: Repository<PublicationEntity>,
    private readonly openAiService: OpenaiCompletionService,
    private readonly usersService: UserService,
  ) {}

  async findAllForUser(owner: UserDto): Promise<PublicationDto[]> {
    let publications = await this.publicationsRepository.find({ where: { owner : {id: owner.id} } });
    return publications.map(toPublicationDto);
  }

  async findById(owner: UserDto, id: string): Promise<PublicationDto> {
    return toPublicationDto(await this.publicationsRepository.findOne({where: {id, owner : {id: owner.id}}}));
  }

  async create(publication: CreatePublicationDto): Promise<PublicationDto> {
    const user: UserDto = await this.usersService.findOne({
      where: { id: publication.owner.id },
    });
    if (!user) {
      throw new HttpException('User did not exist', HttpStatus.BAD_REQUEST);
    }

    let aiCompletionResponse = await this.openAiService.postCompletion(publication);
    publication.openAiResponse = aiCompletionResponse.content;
    publication.tokenPrompt = aiCompletionResponse.tokenPrompt;
    publication.tokenCompletion = aiCompletionResponse.tokenCompletion;

    return toPublicationDto(await this.publicationsRepository.save(publication));
  }

  async update(owner: UserDto, publication: PublicationDto): Promise<PublicationDto> {
    const oldPublication = await this.findEntityById(owner, publication.id);
    console.log('pub', oldPublication);
    console.log('owner', owner);

    if (!oldPublication || oldPublication.owner.id !== owner.id) {
      throw new HttpException('Vous n\'êtes pas autorisé à réaliser cette action', HttpStatus.BAD_REQUEST);
    }

    await this.publicationsRepository.update(publication.id, {
      openAiResponse: publication.openAiResponse,
    });
    return publication;
  }

  async remove(owner: UserDto, id: string): Promise<void> {
    const oldPublication = await this.findEntityById(owner, id);

    if (!oldPublication || oldPublication.owner.id !== owner.id) {
      throw new HttpException('Vous n\'êtes pas autorisé à réaliser cette action', HttpStatus.BAD_REQUEST);
    }

    await this.publicationsRepository.delete(id);
  }

  private findEntityById(owner: UserDto, id: string): Promise<PublicationEntity> {
    return this.publicationsRepository.findOne({where: {id, owner : {id: owner.id}}, relations: ['owner']});
  }
}
