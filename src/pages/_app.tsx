import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useContext, useState } from 'react';
import AppContext from '@/context/AppContext';
import { OrderProvider } from '@/context/orderProvider';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
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
        <RecoilRoot>
          <OrderProvider>
            <Component {...pageProps} />
          </OrderProvider>
        </RecoilRoot>
      </AppContext.Provider>
    </>
  );
}
