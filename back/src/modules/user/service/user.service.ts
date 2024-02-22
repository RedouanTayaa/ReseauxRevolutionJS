import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@user/entity/user.entity';
import { toUserDto } from '@shared/mapper/user.mapper';
import { UserDto } from '../interface/user.dto';
import { LoginUserDto } from '@user/interface/user.login.dto';
import { CreateUserDto } from '@user/interface/user.create.dto';

import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.usersRepository.findOne(options);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return toUserDto(user);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await this.comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ email }): Promise<UserDto> {
    return await this.findOne({ where: { email } });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { password, email } = userDto;

    const userInDb = await this.usersRepository.findOne({
      where: { email },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = await this.usersRepository.create({
      password,
      email,
    });

    await this.usersRepository.save(user);

    return toUserDto(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await argon2.hash(refreshToken);

    return await this.usersRepository.update(userId, {
      refreshToken: currentHashedRefreshToken,
    });
  }

  async setCurrentTokenValidation(token: string, userId: string) {
    return await this.usersRepository.update(userId, {
      tokenVerication: token,
    });
  }

  async removeRefreshToken(email: string) {
    const user = await this.findByPayload({ email });
    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.usersRepository.update(
      { email },
      {
        refreshToken: null,
      },
    );
  }

  async registerValidation(token: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { tokenVerication: token },
    });

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    user.isEmailVerified = true;
    await this.usersRepository.save(user);

    return true;
  }

  async comparePasswords(actualPassword, checkPassword): Promise<boolean> {
    return await argon2.verify(actualPassword, checkPassword);
  }
}