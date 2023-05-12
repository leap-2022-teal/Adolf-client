import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
} from 'react-icons/ai';
import { OrderContext } from '@/context/orderProvider';
import Link from 'next/link';
import { useContext } from 'react';
export default function Footer({ prev, next }: any) {
  const { addToOrder, setSPinfo } = useContext(OrderContext);
  return (
    <>
      <div>
        <div className="w-[100%] h-[80px] border-2 border-black mx-auto mt-10 flex justify-center gap-4 items-center">
          <Link
            className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
            href={`/${prev}`}
            type="button"
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
          >
            Next
          </Link>
        </div>
      </div>
    </>
  );
}
