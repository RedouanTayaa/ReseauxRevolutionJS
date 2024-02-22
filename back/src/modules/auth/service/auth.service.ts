import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '@user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@user/interface/user.create.dto';
import {
  JwtPayload,
  LoginStatus,
  RegistrationStatus,
  Tokens,
} from '@auth/interface/auth.interface';
import { LoginUserDto } from '@user/interface/user.login.dto';
import { UserDto } from '@user/interface/user.dto';

import * as argon2 from 'argon2';
import { SendMailService } from '@mailer/service/sendMail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly sendMailService: SendMailService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      username: userDto.email,
    };
    try {
      const user = await this.usersService.create(userDto);
      const tokens = await this.getTokens({ email: user.email });
      await this.usersService.setCurrentTokenValidation(
        tokens.refreshToken,
        user.id,
      );
      this.sendMailService.mailRegister(user.email, tokens.refreshToken);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.usersService.findByLogin(loginUserDto);
    const tokens = await this.getTokens({ email: user.email });
    await this.usersService.setCurrentRefreshToken(
      tokens.refreshToken,
      user.id,
    );

    return {
      email: user.email,
      ...tokens,
    };
  }

  async getTokens({ email }): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '6h',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async createAccessTokenFromRefreshToken(refreshToken: string) {
    const decoded = this.jwtService.decode(refreshToken) as JwtPayload;
    if (!decoded) {
      throw new HttpException(
        'Invalid token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const user = await this.usersService.findByPayload({
      email: decoded.email,
    });
    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const isRefreshTokenMatching = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!isRefreshTokenMatching) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const tokens = await this.getTokens(user);
    await this.usersService.setCurrentRefreshToken(
      tokens.refreshToken,
      user.id,
    );

    return tokens;
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}