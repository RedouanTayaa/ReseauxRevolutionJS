import { UseCase } from '@/base/use-case';
import { PostModel } from '../models/post.model';
import { PostRepository } from '../repositories/post.repository';
import { Observable } from 'rxjs';

export class PostListUsecase implements UseCase<{}, PostModel[]> {
  constructor(private postRepository: PostRepository) {
  }

  execute(params: {}): Observable<PostModel[]> {
    return this.postRepository.list(params);
  }
}
