import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
export function SPlist() {
  const [spList, setspList] = useState<any>();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/org`)
      .then((res) => {
        setspList(res.data);
        console.log(res.data);
      });
  }, []);
  return (
    <>
      <div className="w-[100%] flex flex-col h-[400px] overflow-y-auto gap-4">
        {spList?.map((spList: any, index: number) => (
          <Link
            href={`/order/${spList._id}`}
            key={index}
            className="w-[90%] mx-auto p-6 odd:bg-blue-100  even:bg-slate-50 border border-gray-200 rounded-lg shadow cursor-pointer"
          >
            <a href="#">
              <h5 className="mb-2 text-xl font-large font-medium text-blue-500">
                {spList.name}
              </h5>
            </a>
            <p className="font-normal text-gray-400 flex gap-3">
              <MdLocationPin className="mt-1" />
              {spList.address.extraAddress}
            </p>
            <p className=" font-normal text-gray-400 flex gap-2">
              <BsTelephoneFill className="w-3 h-3 m-1" />
              {spList.phoneNumber}
            </p>
            <p className="mb-3 font-normal text-gray-400 flex gap-2">
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
