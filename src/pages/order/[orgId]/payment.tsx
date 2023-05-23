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
import React, { useContext, useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
} from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import StepperComponents from '@/components/stepper';
import AppContext from '@/context/AppContext';
import { BsCheckLg } from 'react-icons/bs';
export default function Payment() {
  const router = useRouter();
  const { orgId } = router.query;
  const UserSelectedService = useRecoilValue(orderInfo);
  const selectedSPid = useRecoilValue(OrgInfo);
  const selectedDate = useRecoilValue(selectedDateInfo);
  const totalPrice = useRecoilValue(totalPriceSelector);
  const user = useContext<any>(UserContext);
  const step = useContext<any>(AppContext);
  const [show, setShow] = useState<boolean>(false);
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
    step?.handleNext();
    setShow(true);
  }
  const style = 'opacity-25 ';
  function handleClick() {
    setShow(false);
    step?.handleHome();
  }
  return (
    <>
      <UserProvider>
        <MainLayout>
          <div className="max-w-[400px] flex flex-col  mx-auto relative">
            <div
              className={show === true ? style : 'flex flex-col items-center'}
            >
              <StepperComponents />
              <h1 className="font-medium text-gray-800 w-[80%] text-[18px] ">
                Та Төлбөрөө төлснөөр таны захиалга баталгаажих болно.
              </h1>
            </div>

            <div className="w-[100%] h-[80px]  mx-auto mt-10 flex justify-around  items-center">
              <Link
                href={`/order/${orgId}/summary`}
                onClick={step?.handlePrev}
                className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
              >
                Буцах
              </Link>
              <Link href={`/`} onClick={step?.handleHome}>
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

            {show === true ? (
              <div className="w-full h-[400px] bg-white  border-t-2 rounded-t-lg  absolute top-[180px] flex flex-col items-center gap-10 ease-in-out duration-300">
                <div className="w-[120px] h-[120px] rounded-full border-[1px] flex items-center justify-center border-blue-100  mt-10 ">
                  <div className="w-[100px] h-[100px] rounded-full border-[1px] flex items-center border-blue-300">
                    <div className="w-[80px] h-[80px] rounded-full bg-blue-500 mx-auto flex items-center">
                      <BsCheckLg className="w-10 h-10 mx-auto text-white" />
                    </div>
                  </div>
                </div>
                <h5 className="text-gray-900 font-bold">Амжилттай</h5>
                <Link
                  href="/"
                  type="button"
                  onClick={handleClick}
                  className="text-white w-[200px] bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex justify-center "
                >
                  Буцах
                </Link>
              </div>
            ) : null}
          </div>
        </MainLayout>
      </UserProvider>
    </>
  );
}
