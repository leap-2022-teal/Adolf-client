import HomePage from '@/components/home';
import { UserProvider } from '@/context/userProvider';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ children }: any) {
  return (
    <div>
      <UserProvider>
        <HomePage />
        {children}
      </UserProvider>
    </div>
  );
}
