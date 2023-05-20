import HomePage from '@/components/home';
import { MainLayout } from '@/components/MainLayout';
import { CurrentUser, UserProvider } from '@/context/userProvider';
import { Inter } from 'next/font/google';
import Login from './login';
import { Roboto } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  style: 'italic',
});

export default function Home({ children }: any) {
  const user = CurrentUser();

  if (!user) return null;

  return (
    <UserProvider>
      <MainLayout className={roboto.className}>
        <HomePage />
        {children}
      </MainLayout>
    </UserProvider>
  );
}
