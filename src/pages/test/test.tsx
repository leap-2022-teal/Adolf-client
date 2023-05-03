import { UserProfileContext } from '@/components/context';
import { useContext } from 'react';

export default function Content() {
  const { userPhoneNumber } = useContext<any>(UserProfileContext);

  console.log({ userPhoneNumber });
  return <> xaxax {userPhoneNumber}</>;
}
