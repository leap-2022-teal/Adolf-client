import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
} from 'react-icons/ai';
import { OrderContext } from '@/context/orderProvider';
import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { orderInfo } from '@/pages/atoms';

export default function Footer({ prev, next, selectedService }: any) {
  const { addToOrder, setSPinfo } = useContext(OrderContext);
  const [UserSelectedService, setUserSelectedService] =
    useRecoilState(orderInfo);
  console.log(UserSelectedService);
  const router = useRouter();
  return (
    <>
      <div>
        <div className="w-[100%] h-[80px] border-2 border-black mx-auto mt-10 flex justify-center gap-4 items-center">
          {/* <div
            className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
            onClick={() => router.back}
          >
            Back
          </div> */}
          <Link
            href={`/${prev}`}
            className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
          >
            Back
          </Link>
          <Link href={`/`}>
            <AiOutlineHome className="w-[30px] h-[30px] " type="button" />
          </Link>
          <Link
            className="rounded  bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
            href={`/${next}`}
            type="button"
            onClick={() => setUserSelectedService(selectedService)}
          >
            Next
          </Link>
        </div>
      </div>
    </>
  );
}
