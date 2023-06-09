import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import Example from './stepper';
import { useContext } from 'react';
import AppContext from '@/context/AppContext';
import StepperComponents from './stepper';
export function SPlist(spList: any) {
  const step = useContext<any>(AppContext);
  // const [spList, setspList] = useState<any>();

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/org`)
  //     .then((res) => {
  //       setspList(res.data);
  //       console.log(res.data);
  //     });
  // }, []);
  console.log({ spListuud: spList });
  // console.log({ spListuud: spList });
  return (
    <>
      <StepperComponents />

      <div className="w-[100%] flex flex-col h-[400px] overflow-y-auto gap-4">
        {spList?.spList?.map((spList: any, index: number) => (
          <Link
            onClick={step?.handleNext}
            href={`/order/${spList._id}`}
            key={index}
            className="w-[90%] mx-auto p-6 odd:bg-blue-100 text-gray-500 even:text-slate-600 even:bg-slate-50 border border-gray-200 rounded-lg  shadow cursor-pointer"
          >
            <a href="#">
              <h5 className="flex justify-between mb-2 text-xl font-large font-medium text-blue-500">
                <div>{spList.orgName}</div>
                <div>{spList.distance}м</div>
              </h5>
            </a>
            <p className="font-normal  flex gap-3">
              <MdLocationPin className="mt-1" />
              {spList.address.extraAddress}
            </p>
            <p className=" font-normal text-gray-500 flex gap-2">
              <BsTelephoneFill className="w-3 h-3 m-1" />
              {spList.phoneNumber}
            </p>
            <p className="mb-3 font-normal text-gray-500 flex gap-2">
              <BiCalendar className="m-[3px] w-4 h-4 mt-1" />
              Даваа - Ням <span> </span>
              {spList?.timeTable?.dayStart} - {spList?.timeTable?.dayEnd}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
