import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationEntity } from '@publication/entity/publication.entity';
import { PublicationService } from '@publication/service/publication.service';
import { OpenaiCompletionService } from '@publication/service/openaiCompletion.service';
import { PublicationController } from '@publication/controller/publication.controller';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicationEntity]),
    UserModule,
    AuthModule,
    ConfigModule
  ],
  providers: [PublicationService, OpenaiCompletionService],
  controllers: [PublicationController],
})
export class PublicationModule {}
