'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { PostService } from '@/posts/services/post.service';
import { PostImplementationRepository } from '@/posts/repositories/post-implementation.repository';
import { postDIProvider } from '@/posts/_config/PostDIProvider';
import { PostModel } from '@/posts/models/post.model';

export default function Page() {
  const postService = new PostService();
  const postRepository = new PostImplementationRepository(postService);
  const postsListCase = postDIProvider.postList.useFactory(postRepository);
  const params = useParams<{ id: string; }>();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => await postsListCase.execute({}),
    queryKey: ["posts"],
  });

  let post = data?.find((post: PostModel) => post.id === params.id);

  return (
    <div>
      <h1>Page</h1>
    </div>
  )
}