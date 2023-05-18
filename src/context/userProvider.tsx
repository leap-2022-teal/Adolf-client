import Login from '@/pages/login';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import { useEffect, useState, createContext } from 'react';
export const UserContext = createContext<any>(undefined);
export function UserProvider({ children }: any) {
  const user = CurrentUser();

  if (!user) {
    <Login />;
  }
  return <UserContext.Provider value={user}> {children}</UserContext.Provider>;
}

export function CurrentUser() {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  console.log('user ni', user);
  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/user/getUserInfo`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res: any) => {
        setUser(res.data);
      })
      .catch((e) => {
        localStorage.removeItem('loginToken');
        router.push('/login');
        setUser(null);
      });
  }, []);
  return user;
}
