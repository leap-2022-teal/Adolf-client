import Login from '@/pages/login';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { Router, useRouter } from 'next/router';
import { useEffect, useState, createContext } from 'react';
export const UserContext = createContext<any>(undefined);
export function UserProvider({ children }: any) {
  const user = CurrentUser();
  const router = useRouter();

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return <Login />;
  }

  return <UserContext.Provider value={user}> {children}</UserContext.Provider>;
}

export function CurrentUser() {
  const router = useRouter();
  const [user, setUser] = useState<any>(undefined);
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
        // window.location.reload();
        setUser(null);
      });
  }, []);
  return user;
}
