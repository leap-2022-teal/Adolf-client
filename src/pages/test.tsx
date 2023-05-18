import { CurrentUser } from '@/context/userProvider';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect } from 'react';
// import { Content } from './content';
import Login from './login';

// export const useContext = createContext('Guest');
export default function Test() {
  //   const displayName = useContext(UserContext);
  const router = useRouter();
  // if (!localStorage.getItem('loginToken')) {
  //   return router.push('/login');
  // }
  const user = CurrentUser();
  // if (!user || user === null) return null;
  // useEffect(() => {
  //   if ((!user || user === null) && router.pathname !== '/registrationNumber') {
  //     router.replace('/login');
  //   }
  // }, []);
  if (!user) return null;

  return (
    <>
      Hello
      {/* {displayName.greeting} {displayName.name} */}
      {/* <Content /> */}
    </>
  );
}
