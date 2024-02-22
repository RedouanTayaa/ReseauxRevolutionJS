import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationEntity } from '@publication/entity/publication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicationEntity])],
  providers: [],
  exports: [],
})
export class PublicationModule {}
