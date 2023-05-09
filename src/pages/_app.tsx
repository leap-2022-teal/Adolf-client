import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProfile, UserProfileContext } from '@/components/context';
import { useContext, useState } from 'react';
import AppContext from '@/context/AppContext';

export default function App({ Component, pageProps }: AppProps) {
  function Greeting() {
    <div>
      <strong>Hello </strong>
    </div>;
  }
  // const { userPhoneNumber } = useContext<any>(UserProfileContext);
  const [phone, setPhone] = useState('');

  return (
    <>
      <AppContext.Provider value={{ phone, setPhone }}>
        <div>
          <Component {...pageProps} />
        </div>
      </AppContext.Provider>
    </>
  );
}
