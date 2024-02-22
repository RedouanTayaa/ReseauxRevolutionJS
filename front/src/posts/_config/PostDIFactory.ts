import { PostRepository } from '../repositories/post.repository';
import { PostListUsecase } from '../usecases/post.list.usecase';
import { PostGenerateUsecase } from '../usecases/post.generate.usecase';
import { PostEditUsecase } from '../usecases/post.edit.usecase';
import { PostRemoveUsecase } from '../usecases/post.remove.usecase';

export const postListUseCaseFactory =
  (postRepo: PostRepository) => new PostListUsecase(postRepo);

export const postGenerateUseCaseFactory =
  (postRepo: PostRepository) => new PostGenerateUsecase(postRepo);

export const postEditUseCaseFactory =
  (postRepo: PostRepository) => new PostEditUsecase(postRepo);

export const postRemoveUseCaseFactory =
  (postRepo: PostRepository) => new PostRemoveUsecase(postRepo);
