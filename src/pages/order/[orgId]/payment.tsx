import { MainLayout } from '@/components/MainLayout';
import Test from '@/components/test';
import { UserContext, UserProvider } from '@/context/userProvider';
import { OrgInfo, orderInfo, selectedDateInfo } from '@/pages/atoms';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
} from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
export default function Payment() {
  const router = useRouter();
  const { orgId } = router.query;
  const UserSelectedService = useRecoilValue(orderInfo);
  const selectedSPid = useRecoilValue(OrgInfo);
  const selectedDate = useRecoilValue(selectedDateInfo);
  const user = useContext<any>(UserContext);

  const order = [
    user._id,
    selectedSPid._id,
    UserSelectedService._id,
    selectedDate,
  ];
  console.log(order, 'ss');
  function sendOrder() {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/booking`, order)
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          alert('Success');
        }
      });
  }
  return (
    <>
      <UserProvider>
        <MainLayout>
          <h1>Та Төлбөрөө төлснөөр таны захиалга баталгаажих болно</h1>

          <div className="w-[100%] h-[80px] border-2 border-black mx-auto mt-10 flex justify-center gap-4 items-center">
            <Link
              href={`/order/${orgId}/summary`}
              className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
            >
              Буцах
            </Link>
            <Link href={`/`}>
              <AiOutlineHome className="w-[30px] h-[30px] " type="button" />
            </Link>
            <Link
              className="rounded  bg-blue-500 w-[120px] h-[40px] text-white  flex justify-center items-center  "
              href={`/order/${orgId}/payment`}
              type="button"
              onClick={sendOrder}
            >
              Төлбөр төлөх
            </Link>
          </div>
        </MainLayout>
      </UserProvider>
    </>
  );
}
