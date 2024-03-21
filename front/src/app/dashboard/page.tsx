'use client';

import { useQuery } from '@tanstack/react-query';
import { postDIProvider } from '@/posts/_config/PostDIProvider';
import { PostImplementationRepository } from '@/posts/repositories/post-implementation.repository';
import { PostService } from '@/posts/services/post.service';
import { TruncatePipe } from '@/core/pipes/truncate.pipe';
import { PostModel } from '@/posts/models/post.model';
import Loading from '@/components/loading/Loading';
import Link from 'next/link';

export default function Page() {
  const postService = new PostService();
  const postRepository = new PostImplementationRepository(postService);
  const postsListCase = postDIProvider.postList.useFactory(postRepository);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => await postsListCase.execute({}),
    queryKey: ["posts"],
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>{error?.message ?? 'Une erreur est survenue'}</div>;

  return <>
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 flex h-16 items-center justify-between my-6">
        <div className="flex flex-1 items-center justify-start sm:items-stretch">
          Liste des posts générés
        </div>

        <div className="inset-y-0 right-0 flex items-center pr-0 static sm:inset-auto sm:ml-6">
          <Link href={'/publications/add'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Créer un post</Link>
        </div>
      </div>

    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 hidden sm:table">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Post
        </th>
        <th scope="col" className="px-6 py-3">
          Plateforme
        </th>
        <th scope="col" className="px-4 py-3">
          <span className="sr-only">Editer</span>
        </th>
        <th scope="col" className="px-4 py-3">
          <span className="sr-only">Supprimer</span>
        </th>
      </tr>
      </thead>
      <tbody>
        {data?.map((post: PostModel) => {
          return (
            <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {post?.text ? TruncatePipe({value: post?.text, limit: 100}) : ''}
              </td>
              <td className="px-6 py-4">
                {post?.platform}
              </td>
              <td className="px-6 py-4">
                <Link href={'/publications/edit/' + post.id}>
                  <button>
                    <svg className="w-[17px] h-[17px] text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                    </svg>
                  </button>
                </Link>
              </td>
              <td className="px-6 py-4">
                <button>
                  <svg className="w-[17px] h-[17px] text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                  </svg>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>


    <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table sm:hidden">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-2 py-3 w-3/4">
          Post
        </th>
        <th scope="col" className="px-2 py-3">
          Action
          <span className="sr-only">Editer</span>
        </th>
        <th scope="col" className="px-2 py-3">
          <span className="sr-only">Supprimer</span>
        </th>
      </tr>
      </thead>
      <tbody>
      {
        data?.map((post: PostModel) => {
          return (
            <tr key={post.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {post?.text ? TruncatePipe({value: post?.text, limit: 30}) : ''} <br />
                Plateforme: {post?.platform}
              </td>
              <td className="px-6 py-4">
                <Link href={'/publications/edit/' + post.id}>
                  <button>
                    <svg className="w-[17px] h-[17px] text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                    </svg>
                  </button>
                </Link>
              </td>
              <td className="px-6 py-4">
                <button>
                  <svg className="w-[17px] h-[17px] text-gray-800 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                  </svg>
                </button>
              </td>
            </tr>
          );
        })
      }
      </tbody>
    </table>
</div>
</>
}