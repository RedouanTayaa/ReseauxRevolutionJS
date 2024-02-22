'use client';
import { UserImplementationRepository } from '@/users/repositories/user-implementation.repository';
import { userDIProvider } from '@/users/_config/UserDIProvider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { environment } from '@/environment/environment';

export default function Page() {
  const appName = environment.appName;
  const router = useRouter();
  const userRepository = new UserImplementationRepository();
  const userForgetPassword = userDIProvider.userForgetPassword.useFactory(userRepository);
  const [isSubmitted, setSubmitted] = useState(false);

  const togleSubmitted = () => {
    setSubmitted((prevSubmitted) => {
      return !prevSubmitted;
    });
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      return;
    }

    togleSubmitted();

    const formData = new FormData(event.currentTarget);
    userForgetPassword
      .execute({username: formData.get('email') as string})
      .subscribe({
        next: (user) => {
          togleSubmitted();
          router.push('/user/forget-password/success');
          router.refresh();
        },
        error: (error) => {
          toast.error(error.message);
          togleSubmitted();
        }
      });
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src={`/logo.svg`} alt={appName} width="32" height="32" className="mx-auto h-32 w-auto"/>
        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Mot de passe oublié</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email avec lequel vous vous êtes inscrit</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" required
                     className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <button type="submit" disabled={isSubmitted}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Valider
            </button>
          </div>
        </form>
      </div>
    </>
  )
}