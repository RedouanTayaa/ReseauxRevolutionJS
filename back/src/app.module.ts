import { Module } from '@nestjs/common';
import { configService } from '@config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { PublicationModule } from '@publication/publication.module';
import { SendMailerModule } from '@mailer/sendMailer.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PublicationModule,
    SendMailerModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
