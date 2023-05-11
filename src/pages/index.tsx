import HomePage from '@/components/home';
import { MainLayout } from '@/components/MainLayout';
import { UserProvider } from '@/context/userProvider';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ children }: any) {
  return (
    <UserProvider>
      <MainLayout>
        <HomePage />
        {children}
      </MainLayout>
    </UserProvider>
  );
}
