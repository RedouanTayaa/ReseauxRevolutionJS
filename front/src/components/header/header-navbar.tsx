import { AuthService } from '@/core/services/auth.service';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { environment } from '@/environment/environment';
import Link from 'next/link';

export default function HeaderNavbar() {
  const appName = environment.appName;
  const auth = new AuthService();
  const router = useRouter();

  const logout = () => {
    auth.removeToken();
    router.push('/user/login');
    router.refresh();
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image src={`/logo.svg`} alt={appName} width="10" height="10" className="mx-auto h-10 w-auto"/>
            </div>
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href={"/dashboard"}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <button onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm
            font-medium">Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
    ;
}