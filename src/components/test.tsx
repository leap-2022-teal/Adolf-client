import { UserContext } from '@/context/userProvider';
import { useContext } from 'react';

export default function Test() {
  const user = useContext<any>(UserContext);
  console.log(user, 'test');
  return <div>Hello,{user?.firstName}</div>;
}
