import {
  userForgetPasswordUseCaseFactory,
  userLoginUseCaseFactory,
  userRegisterUseCaseFactory, userStripeLinkUseCaseFactory
} from '../_config/UserDIFactory';
import { UserRepository } from '../repositories/user.repository';

export const userDIProvider = {
  userLogin: {
    provide: 'userLogin',
    useFactory: userLoginUseCaseFactory,
    deps: [UserRepository],
  },
  userRegister: {
    provide: 'userRegister',
    useFactory: userRegisterUseCaseFactory,
    deps: [UserRepository],
  },
  userForgetPassword: {
    provide: 'userForgetPassword',
    useFactory: userForgetPasswordUseCaseFactory,
    deps: [UserRepository],
  },
  userStripeLink: {
    provide: 'userStripeLink',
    useFactory: userStripeLinkUseCaseFactory,
    deps: [UserRepository],
  }
}
