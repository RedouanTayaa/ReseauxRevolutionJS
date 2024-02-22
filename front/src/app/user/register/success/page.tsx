'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { environment } from '@/environment/environment';

export default function Page() {
  const router = useRouter();
  const appName = environment.appName;

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src={`/logo.svg`} alt={appName} width="32" height="32" className="mx-auto h-32 w-auto"/>
        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inscription réussi
          !</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div className="block text-sm font-medium leading-6 text-gray-900">Vérifiez votre boite mail afin de valider
            votre
            compte.
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          <Link href={'/user/login'} className="font-semibold leading-6 text-black-600 hover:text-black-500">Accédez
            à la page de connexion</Link>
        </p>
      </div>
    </>
  )
}