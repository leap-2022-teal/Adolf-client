import { MainLayout } from '@/components/MainLayout';
import Test from '@/components/test';
import { UserContext, UserProvider } from '@/context/userProvider';
import {
  OrgInfo,
  orderInfo,
  selectedDateInfo,
  totalPriceSelector,
} from '@/components/atoms';
import axios from 'axios';
import Image from 'next/image';
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
  const totalPrice = useRecoilValue(totalPriceSelector);
  const user = useContext<any>(UserContext);

  const extraServices: string[] =
    UserSelectedService?.selectedExtraService?.map((obj: any) => obj._id);
  const order = [
    user._id,
    selectedSPid._id,
    UserSelectedService.selectedService._id,
    extraServices,
    selectedDate,
    totalPrice,
  ];
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
          <div className="max-w-[400px] flex flex-col  mx-auto">
            <h1>Та Төлбөрөө төлснөөр таны захиалга баталгаажих болно.</h1>

            <div className="w-[100%] h-[80px]  mx-auto mt-10 flex justify-around  items-center">
              <Link
                href={`/order/${orgId}/summary`}
                className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
              >
                Буцах
              </Link>
              <Link href={`/`}>
                <Image
                  src="/home-button.png "
                  width={42}
                  height={42}
                  alt="button"
                />
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
          </div>
        </MainLayout>
      </UserProvider>
    </>
  );
}
