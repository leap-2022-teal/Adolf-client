import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import dotenv from 'dotenv';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <h1>Hello user</h1>
      <Component {...pageProps} />
    </div>
  );
}
