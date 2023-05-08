import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { Content } from './content';
import Login from './login/login';

// export const useContext = createContext('Guest');
function Home() {
  //   const displayName = useContext(UserContext);
  const router = useRouter();
  if (!localStorage.getItem('loginToken')) {
    return router.push('/login/login');
  }
  return (
    <>
      {/* {displayName.greeting} {displayName.name} */}
      <Content />
    </>
  );
}
