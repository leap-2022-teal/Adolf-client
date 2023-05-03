import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import dotenv from 'dotenv';
import { UserProfile, UserProfileContext } from '@/components/context';
import { useContext } from 'react';
export default function App({ Component, pageProps }: AppProps) {
  function Greeting() {
    <div>
      <strong>Hello </strong>
    </div>;
  }
  const { userPhoneNumber } = useContext<any>(UserProfileContext);
  return (
    <>
      <UserProfile>
        <div>
          <h1>Hello {userPhoneNumber}</h1>
          <Component {...pageProps} />
        </div>
      </UserProfile>
    </>
  );
}
