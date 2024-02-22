import { UserEntity } from '@user/entity/user.entity';
import { UserDto } from '@user/interface/user.dto';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, email, lastUpdate, refreshToken } = data;
  return { id, email, lastUpdate, refreshToken };
};