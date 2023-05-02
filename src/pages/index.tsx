import Image from 'next/image';
import { Inter } from 'next/font/google';
import Example from '../components/example';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [name, setName] = useState<string>('Bat');
  const [user, setUsers] = useState<any>();
  function onEdit(e: string) {
    setName(e);
  }
  function loadUsers() {
    console.log('url', process.env.REACT_APP_API_URL);
    const token = localStorage.getItem('loginToken');
    axios
      .get(`${process.env.REACT_APP_API_URL}/registration/userInfo`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setUsers(data);
        } else {
          alert(`Aldaa garlaa: ${status}`);
        }
      });
  }

  useEffect(() => {
    loadUsers();
  }, []);
  console.log(user);
  const router = useRouter();

  return (
    <div>
      <h1>Home page</h1>
      <Example name={name} age={20} handleClick={onEdit} />
    </div>
  );
}
