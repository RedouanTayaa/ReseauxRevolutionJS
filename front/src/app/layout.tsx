'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import { useRouter } from 'next/navigation';
import { AuthService } from '@/core/services/auth.service';
import { useEffect } from 'react';
import ReactQueryProvider from '@/core/providers/reactQuery.provider';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
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
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  }

  useEffect(() => {
    checkAuth()
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
