import { Observable } from 'rxjs';
import { UseCase } from '@/base/use-case';
import { UserRepository } from '../repositories/user.repository';
import { StripeModel } from '../models/stripe.model';
export class UserStripeLinkUseCase implements UseCase<void, StripeModel> {
  constructor(private userRepository: UserRepository) { }
  execute(): Observable<StripeModel> {
    return this.userRepository.getStripeLink();
  }
}
