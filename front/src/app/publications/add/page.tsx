'use client';

import { PostService } from '@/posts/services/post.service';
import { PostImplementationRepository } from '@/posts/repositories/post-implementation.repository';
import { postDIProvider } from '@/posts/_config/PostDIProvider';
import Link from 'next/link';
import { useState } from 'react';
import { PostPlatformType } from '@/posts/models/post.platform.type';
import { PostWritingType } from '@/posts/models/post.writing.type';
import { PostModeType } from '@/posts/models/post.mode.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '@/components/loading/Loading';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const postService = new PostService();
  const postRepository = new PostImplementationRepository(postService);
  const postGenerateCase = postDIProvider.postGenerate.useFactory(postRepository);
  const [postType, setPostType] = useState('publication');
  const [targetAudience, setTargetAudience] = useState('');
  const [topic, setTopic] = useState('');
  const [modeTypes, setModeTypes] = useState<{value: string, option: string}[]>([]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      return;
    }
    const formData = new FormData(event.currentTarget);
    mutate(formData)
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      const post = {
        choice: formData.get('choice') as string,
        type: postType,
        platform: formData.get('platform') as string,
        targetAudience: targetAudience,
        topic: topic,
        writingTechnique: formData.get('writingTechnique') as string,
        mode: formData.get('mode') as string
      };
      return await postGenerateCase.execute(post);
    },
    onSuccess: data => {
      router.push('/publications/edit/' + data.id);
      router.refresh();
      console.log(data);
      toast.success('La publication a été générée avec succès');
    },
    onError: (error) => {
      toast.error(error.message ?? 'Une erreur est survenue');
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['posts']});
    }
  });

  const onChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostType(event.target.value);
  }

  const onTargetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetAudience(event.target.value);
  }

  const onPlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setModeTypes(PostModeType[event.target.value]);
  }

  const onTopicChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(event.target.value);
  }

  if (isPending || isSuccess) return <Loading />;

  return (
    <>
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div
        className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 flex h-16 items-center justify-between my-6">
        <div className="flex flex-1 items-center justify-start sm:items-stretch">
          Générer un post
        </div>

        <div className="inset-y-0 right-0 flex items-center pr-0 static sm:inset-auto sm:ml-6">
          <Link href={'/dashboard'}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Retour
            à la liste</Link>
        </div>
      </div>

      <form className="p-4 md:p-5" onSubmit={onSubmit}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="flex col-span-2">
            <div className="flex items-center me-4">
              <input id="inline-2-radio" type="radio" value="publication" name="choice" onChange={onChoiceChange}
                     checked={postType === 'publication'}
                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Publication:
                partage communautaire</label>
            </div>
            <div className="flex items-center me-4">
              <input id="inline-radio" type="radio" value="sales" name="choice" onChange={onChoiceChange}
                     checked={postType === 'sales'}
                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vente:
                promotion commerciale</label>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="platform"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plateforme</label>
            <select id="platform" name="platform" onInput={onPlatformChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              <option value="">Selectionnez la plateforme</option>
              {PostPlatformType.map((platform) => {
                return <option key={platform.value} value={platform.value}>{platform.option}</option>
              })}
            </select>
          </div>

          {
            postType === 'publication' &&
              <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="writingTechnique"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type
                  </label>
                  <select id="writingTechnique" name="writingTechnique"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="">Selectionnez un type</option>
                    {PostWritingType.map((writing) => {
                      return <option key={writing.value} value={writing.value}>{writing.option}</option>
                    })}
                  </select>
              </div>
          }

          {
            postType === 'sales' &&
              <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="mode"
                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                  <select id="mode" name="mode"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="">Selectionnez un type</option>
                    {modeTypes.map((mode) => {
                      return <option key={mode.value} value={mode.value}>{mode.option}</option>
                    })}
                  </select>
              </div>
          }

          <div className="col-span-2">
            <label htmlFor="targetAudience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre
              public visé en quelques mots
              <span
                className={targetAudience.length > 255 ? 'text-red-900' : ''}>({targetAudience?.length ?? 0}/255)</span></label>
            <input id="targetAudience" type="text" name="targetAudience" onChange={onTargetChange}
                   className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>

          <div className="col-span-2">
            <label htmlFor="topic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Résumé du
              sujet <span
                className={topic.length > 255 ? 'text-red-900' : ''}>({topic?.length ?? 0}/255)</span></label>
            <textarea id="topic" name="topic" onInput={onTopicChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Résumez le sujet du post ici"></textarea>
          </div>

          <button type="submit" className="text-white inline-flex items-center bg-blue-700
          hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5
          py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"></path>
            </svg>
            Lancer la génération du post
          </button>
        </div>
      </form>

    </div>
    </>
  );
}
