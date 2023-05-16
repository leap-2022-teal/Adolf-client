import { MainLayout } from '@/components/MainLayout';
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
  console.log({ user });
  function sendOrder() {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/order`, {
        UserSelectedService,
      })
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
          <h1>Payment</h1>
          <h1>{user?.phoneNumber}</h1>
          <div className="w-[100%] h-[80px] border-2 border-black mx-auto mt-10 flex justify-center gap-4 items-center">
            <Link
              href={`/order/${orgId}/summary`}
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
              onClick={() => sendOrder()}
            >
              Төлбөр
            </Link>
          </div>
        </MainLayout>
      </UserProvider>
    </>
  );
}
