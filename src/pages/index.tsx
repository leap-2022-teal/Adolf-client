import HomePage from '@/components/home';
import { MainLayout } from '@/components/MainLayout';
import { CurrentUser, UserProvider } from '@/context/userProvider';
import { Inter } from 'next/font/google';
import Login from './login';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ children }: any) {
  const user = CurrentUser();

  if (!user) return null;

  return (
    <UserProvider>
      <MainLayout>
        <HomePage />
        {children}
      </MainLayout>
    </UserProvider>
  );
}
