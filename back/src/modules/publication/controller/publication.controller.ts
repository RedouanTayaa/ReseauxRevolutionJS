import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Put,
  Param,
  Delete
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@auth/service/auth.guard';
import { PublicationDto } from '@publication/interface/publication.dto';
import { CreatePublicationDto } from '@publication/interface/publication.create.dto';
import { PublicationService } from '@publication/service/publication.service';

@Controller('api/publications')
@ApiTags('Publication')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new publication' })
  public async registerValidation(
    @Request() req,
    @Body() createPublicationDto: CreatePublicationDto,
  ) {
    createPublicationDto.owner = req.user;

    try {
      return await this.publicationService.create(createPublicationDto);
    } catch {
      throw new HttpException(
        'Try again in a few minutes',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all publications of the connected user' })
  public async getPublicationsByUser(@Request() req) {
    return await this.publicationService.findAllForUser(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get publication by id' })
  public async getPublicationById(@Request() req, @Param('id') id: string) {
    return await this.publicationService.findById(req.user, id);
  }

  @Put()
  @ApiOperation({ summary: 'Update publication' })
  public async updateMeal(
    @Request() req,
    @Body() publicationDto: PublicationDto,
  ): Promise<PublicationDto> {
    try {
      return await this.publicationService.update(req.user, publicationDto);
    } catch (e) {
      console.log(e)
      throw new HttpException(
        'Try again in a few minutes',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove meal' })
  public async deleteMeal(@Request() req, @Param('id') id: string) {
    try {
      await this.publicationService.remove(req.user, id);

      return { success: true };
    } catch {
      throw new HttpException(
        'Try again in a few minutes',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}