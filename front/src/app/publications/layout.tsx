'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthService } from '@/core/services/auth.service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import HeaderNavbar from '@/components/header/header-navbar';

export default function PublicationsLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const auth = new AuthService();

  const checkAuth = () => {
    if (!auth.isAuthenticated()) {
      router.push('/user/login');
      router.refresh();
    }
  }

  useEffect(() => {
    checkAuth()
  }, []);

  return (
    <>
      <HeaderNavbar/>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {children}
        <ToastContainer position="top-right"/>
      </div>
    </>
  );
}
