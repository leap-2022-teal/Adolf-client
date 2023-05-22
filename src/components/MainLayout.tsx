import { UserContext } from '@/context/userProvider';
import { useContext } from 'react';
import { UserSideBar } from './userSideBar';
import { Example } from '@/context/StepperContext';

export function MainLayout({ children }: any) {
  const user = useContext(UserContext);
  return (
    <div>
      <UserSideBar />
      <main>{children}</main>

      {/* <Footer /> */}
    </div>
  );
}
