import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {children}
      <ToastContainer position="top-right" />
    </div>
  );
}
