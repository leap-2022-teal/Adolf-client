import { OrgInfo, orderInfo, selectedDateInfo } from '@/pages/atoms';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
} from 'react-icons/ai';
import { useRouter } from 'next/router';
export default function Summary() {
  const UserSelectedService = useRecoilValue(orderInfo);
  const selectedSPid = useRecoilValue(OrgInfo);
  const selectedDate = useRecoilValue(selectedDateInfo);
  const router = useRouter();
  const { orgId } = router.query;
  console.log({ UserSelectedService, selectedSPid, selectedDate });
  return (
    <>
      <h1>Summary</h1>
      <div>
        <div className="w-[100%] h-[80px] border-2 border-black mx-auto mt-10 flex justify-center gap-4 items-center">
          <Link
            href={`/order/${orgId}/calendar`}
            className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
          >
            Back
          </Link>
          <Link href={`/`}>
            <AiOutlineHome className="w-[30px] h-[30px] " type="button" />
          </Link>
          <Link
            className="rounded  bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
            href={`/order/${orgId}/payment`}
            type="button"
          >
            Цаг захиалах
          </Link>
        </div>
      </div>
    </>
  );
}
