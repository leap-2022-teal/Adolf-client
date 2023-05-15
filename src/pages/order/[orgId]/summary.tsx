import { OrgInfo, orderInfo, selectedDateInfo } from '@/pages/atoms';
import { useRecoilValue } from 'recoil';
export default function Summary() {
  const UserSelectedService = useRecoilValue(orderInfo);
  const selectedSPid = useRecoilValue(OrgInfo);
  const selectedDate = useRecoilValue(selectedDateInfo);

  console.log({ UserSelectedService, selectedSPid, selectedDate });
  return (
    <>
      <h1>Summary</h1>
    </>
  );
}
