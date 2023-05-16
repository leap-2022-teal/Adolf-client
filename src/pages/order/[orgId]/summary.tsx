import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FiClock } from 'react-icons/fi';
import Footer from '@/components/footer';
export default function Summary() {
  const [sP, setSp] = useState<any>([]);
  const router = useRouter();
  const { orgId } = router.query;
  useEffect(() => {
    if (orgId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/serviceProvider/${orgId}`
        )
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
  console.log(sP.name, 'hha');
  return (
    <>
      <div className="w-[400px] h-[360px] mx-auto bg-zinc-50 mt-10 rounded">
        <div className="w-[90%]  divide-y  divide-slate-200 h-screen mx-auto">
          <h5 className="font-semibold text-[30px] ml-10 p-2">
            Booking Summury
          </h5>
          <div className="w-[100%] p-2 flex gap-6">
            <IoLocationOutline className="w-6 h-6 mt-2 text-slate-500" />
            <div>
              <h5 className="font-bold">{sP.name}</h5>
              <p className="text-slate-500">{sP.address.extraAddress}</p>
            </div>
          </div>
          <div className="p-2 flex gap-8 ">
            <FiClock className="w-5 h-5 ml-1 mt-3" />
            <div>
              <h5 className="font-semibold">24 May 2023</h5>
              <p className="text-slate-500 ">09:30 am</p>
            </div>
          </div>
          <div>
            <h5 className="flex justify-between p-2  mt-5 mb-5 font-semibold">
              <span>Buten</span>
              <span>40000₮</span>
            </h5>
          </div>
          <div className="flex justify-between p-2 font-semibold pt-5 ">
            <span>Total</span>
            <span>40000₮</span>
          </div>
        </div>
      </div>
    </>
  );
}
