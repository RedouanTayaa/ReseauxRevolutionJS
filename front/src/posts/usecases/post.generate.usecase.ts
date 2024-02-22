import { UseCase } from '@/base/use-case';
import { PostModel } from '../models/post.model';
import { PostRepository } from '../repositories/post.repository';
import { Observable } from 'rxjs';
import { PostEntity } from '../entities/post-entity';

export class PostGenerateUsecase implements UseCase<PostEntity, PostModel> {
  constructor(private postRepository: PostRepository) {
  }

  execute(params: PostEntity): Observable<PostModel> {
    return this.postRepository.add(params);
  }
}
