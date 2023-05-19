import { OrgInfo, orderInfo, selectedDateInfo } from '@/components/atoms';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
} from 'react-icons/ai';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FiClock } from 'react-icons/fi';
import { UserProvider } from '@/context/userProvider';
import { MainLayout } from '@/components/MainLayout';
import Image from 'next/image';
export default function Summary() {
  const UserSelectedService = useRecoilValue(orderInfo);
  const selectedSPid = useRecoilValue(OrgInfo);
  const selectedDate = useRecoilValue(selectedDateInfo);
  const [sP, setSp] = useState<any>([]);
  const router = useRouter();
  const { orgId } = router.query;
  const numeral = require('numeral');
  console.log({ UserSelectedService, selectedSPid, selectedDate });
  useEffect(() => {
    if (orgId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/org/${orgId}`)
        .then((res) => {
          const { data, status } = res;
          if (status === 200) {
            setSp(data);
          } else {
            alert('aldaa garlaa');
          }
        });
    }
  }, [orgId]);
  console.log(sP, 'sss');
  return (
    <>
      <UserProvider>
        <MainLayout>
          {/* <h1>Summary</h1> */}
          <div className="max-w-[400px] h-[360px] mx-auto bg-zinc-50 mt-10 rounded">
            <div className="w-[90%]  divide-y  divide-slate-200 mx-auto">
              <h5 className="font-semibold text-[30px] ml-10 p-2">
                Таны захиалга
              </h5>
              <div className="w-[100%] p-2 flex gap-6">
                <IoLocationOutline className="w-6 h-6 mt-2 text-slate-500" />
                <div>
                  <h5 className="font-bold">{sP.name}</h5>
                  <p className="text-slate-500">{sP.address?.extraAddress}</p>
                </div>
              </div>
              <div className="p-2 flex gap-8 ">
                <FiClock className="w-5 h-5 ml-1 mt-3" />
                <div>
                  <h5 className="font-semibold">{selectedDate[0]}</h5>
                  <p className="text-slate-500 ">{selectedDate[1]}</p>
                </div>
              </div>
              <div>
                <span className="text-grey-900 font-bold p-2">
                  Үйлчилгээний төрөл
                </span>
                <h5 className="flex justify-between p-2 mb-5 font-semibold">
                  <span>{UserSelectedService.name}</span>
                  <span>
                    {numeral(UserSelectedService.price).format('0,0 ')} ₮
                  </span>
                </h5>
              </div>
              <div className="flex justify-between p-2 font-semibold pt-5 ">
                <span>Нийт төлбөр</span>
                <span>
                  {numeral(UserSelectedService.price).format('0,0 ')} ₮
                </span>
              </div>
            </div>
            <div className="max-w-[450px] h-[80px]  mx-auto mt-10 flex justify-around gap-4 items-center ">
              <Link
                href={`/order/${orgId}/calendar`}
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
              >
                Цаг захиалах
              </Link>
            </div>
          </div>
        </MainLayout>
      </UserProvider>
    </>
  );
}
