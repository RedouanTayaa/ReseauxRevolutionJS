import { UseCasePromise } from '@/base/use-case';
import { PostModel } from '../models/post.model';
import { PostRepository } from '../repositories/post.repository';
import { PostEntity } from '../entities/post-entity';

export class PostGenerateUsecase implements UseCasePromise<PostEntity, PostModel> {
  constructor(private postRepository: PostRepository) {
  }

  execute(params: PostEntity): Promise<PostModel> {
    return this.postRepository.add(params);
  }
}
