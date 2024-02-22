import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserController } from '@user/controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}