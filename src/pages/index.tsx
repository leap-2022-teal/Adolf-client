import Image from 'next/image';
import { Inter } from 'next/font/google';
import Example from '../components/example';
import { useState } from 'react';
import { Router, useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [name, setName] = useState<string>('Bat');
  function onEdit(e: string) {
    setName(e);
  }
  const router = useRouter();
  // if (!localStorage.getItem('loginToken')) {
  //   return router.push('/login/login');
  // }
  return (
    <div>
      <h1>Home page</h1>
      <Example name={name} age={20} handleClick={onEdit} />
    </div>
  );
}
