import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
export const UserContext = createContext<any>(undefined);
export function UserProvider({ children }: any) {
  const user = CurrentUser();

  // const [order, setOrder] = useState<any>(undefined);
  // console.log('orderid', order);
  // function addToOrder(id: any) {
  //   setOrder(id);
  // }
  return <UserContext.Provider value={user}> {children}</UserContext.Provider>;
}

export function CurrentUser() {
  const [user, setUser] = useState<any>();
  console.log('user ni', user);
  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/getUserInfo`, {
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
