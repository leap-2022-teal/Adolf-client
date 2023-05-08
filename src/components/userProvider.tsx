import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
export const UserContext = createContext<any>(undefined);
export function UserProvider({ children }: any) {
  const user = CurrentUser();
  return <UserContext.Provider value={user}> {children}</UserContext.Provider>;
}

export function CurrentUser() {
  const [user, setUser] = useState<any>();
  console.log('user', user);
  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    axios
      .get('http://localhost:8000/registration/getUserInfo', {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res: any) => {
        setUser(res.data);
      })
      .catch((e) => {
        setUser(null);
      });
  }, []);
  return user;
}
