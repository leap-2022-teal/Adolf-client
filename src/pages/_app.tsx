import AppContext from '@/components/AppContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { useState, createContext } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [phone, setPhone] = useState('');

  return (
    <AppContext.Provider value={{ phone, setPhone }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
