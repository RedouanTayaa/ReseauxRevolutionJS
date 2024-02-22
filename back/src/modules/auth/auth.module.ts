import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '@auth/controller/auth.controller';
import { AuthService } from '@auth/service/auth.service';
import { JwtStrategy } from '@auth/service/jwt.strategy';
import { AuthGuard } from '@auth/service/auth.guard';
import { RefreshStrategy } from '@auth/service/refresh.strategy';
import { RefreshTokenGuard } from '@auth/service/refreshToken.guard';
import { SendMailerModule } from '@mailer/sendMailer.module';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({}),
    ConfigModule,
    SendMailerModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshStrategy,
    AuthGuard,
    RefreshTokenGuard,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}