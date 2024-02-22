import { UserRepository } from '../repositories/user.repository';
import { UserLoginUseCase } from '../usecases/login.usecase';
import { UserRegisterUseCase } from '../usecases/register.usecase';
import { UserForgetPasswordUseCase } from '../usecases/forget-password.usecase';
import { UserStripeLinkUseCase } from '../usecases/stripe-link.usecase';

export const userLoginUseCaseFactory =
  (userRepo: UserRepository) => new UserLoginUseCase(userRepo);

export const userRegisterUseCaseFactory =
  (userRepo: UserRepository) => new UserRegisterUseCase(userRepo);

export const userForgetPasswordUseCaseFactory =
  (userRepo: UserRepository) => new UserForgetPasswordUseCase(userRepo);

export const userStripeLinkUseCaseFactory =
  (userRepo: UserRepository) => new UserStripeLinkUseCase(userRepo);
