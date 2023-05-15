import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserProvider } from '@/context/userProvider';
import { MainLayout } from '@/components/MainLayout';
import { OrderContext } from '@/context/orderProvider';
import Link from 'next/link';
import Footer from '@/components/footer';
export default function Calendar() {
  const [start, setStart] = useState<any>();
  console.log('startsh', start);
  const router = useRouter();
  const { orgId } = router.query;
  const [selectCalendar, setSelectCalendar] = useState<any>();
  const [selectTime, setSelectTime] = useState<any>({});
  const { addToOrder, setSPinfo, SPinfo } = useContext(OrderContext);
  const [back, setBack] = useState<any>();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const normal =
    ' flex flex-col border-2 text-gray-600 bg-gray-100  w-[50px] h-[80px]  items-center rounded';
  const active =
    ' flex flex-col border-2 text-white bg-blue-500  w-[50px] h-[80px]  items-center rounded';
  const normalTime = 'rounded bg-gray-100 h-8 text-gray-600  ';
  const activeTime = 'rounded bg-blue-500 h-8 text-white  ';
  const getDaysArray = function (s: any, e: any) {
    for (
      var a = [], d = new Date(s);
      d <= new Date(e);
      d.setDate(d.getDate() + 1)
    ) {
      a.push(new Date(d));
    }
    return a;
  };

  let startDay = new Date();
  let end = new Date();
  end.setDate(startDay.getDate() + 10);

  const days: any = getDaysArray(startDay, end);
  // const getTimes = () => {
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/serviceProvider/${SPinfo._id}`
      )
      .then((res) => {
        if (res.data.timeTable) {
          setStart(res.data.timeTable);
          console.log(res.data);
        }
      });
  }, []);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/serviceProvider`)
  //     .then((res) => {
  //       setBack(res.data);
  //       console.log(res.data);
  //     });
  // }, []);

  const beginning = Number(start?.dayStart.substring(0, 2));
  const close = Number(start?.dayEnd.substring(0, 2));
  const times = [];
  for (let i = beginning; i <= close; i++) {
    // const bookingLog = booking.filter((e: any) => {
    //   if (e.time.start >= i && e.time.end < i) {
    //     return i;
    //   }
    // });
    // const count = bookingLog.length;
    // if (count < zogsool) {
    //   times.push({
    //     label: `${i}:00 - ${i + 1}:00`,
    //     value: i,
    //     isAvailable: true,
    //   });
    // } else {
    times.push({
      label: `${i}:00 - ${i + 1}:00`,
      value: i,
      // isAvailable: false,
    });
    // }
  }
  //
  // };
  // console.log(times);
  // const time =setHours(0,0,0,0)

  // const times = getTimes();
  return (
    <UserProvider>
      <MainLayout>
        <div className="w-[400px] h-screen  mx-auto">
          <h1 className="mb-2 text-xl font-large font-medium text-slate-700 ml-8 mt-5">
            Appointment date
          </h1>
          <h5 className="text-slate-500 text-[15px] font-normal ml-10 mb-2 mt-10">
            Select day
          </h5>
          <div className="w-[80%] h-[100px] mx-auto  overflow-x-auto   rounded mt-4">
            <div className="w-[700px]  flex gap-5 ">
              {days.map((e: any, index: number) => {
                e.getDate();
                // console.log(e, 'e');
                let day = weekDays[e.getDay()];

                return (
                  <p
                    key={index}
                    className={
                      selectCalendar?.toString().slice(0, 10) ===
                      e.toString().slice(0, 10)
                        ? active
                        : normal
                    }
                    onClick={() => setSelectCalendar(e)}
                  >
                    <span className="mt-3">{day}</span>
                    <span className=" text-xl font-large font-medium">
                      {e.getDate()}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
          <h5 className="text-slate-500 text-[15px] font-normal ml-10 mb-2 mt-4">
            Select time
          </h5>
          <div className=" w-[80%] h-screen mx-auto  ">
            <div className=" grid grid-cols-2 gap-2 ">
              {times?.map((time: any, i: number) => (
                <div
                  key={`time-${i}`}
                  className={
                    selectTime === time.label ? activeTime : normalTime
                  }
                  onClick={() => setSelectTime(time.label)}
                >
                  <div className="h-2 w-[110px] pt-1  mx-auto">
                    {time.label}
                  </div>
                </div>
              ))}
            </div>
            <Footer prev={`/order/${orgId}`} />
            {/* <Footer next={'summary'} prev ={""} /> */}
          </div>
        </div>
      </MainLayout>
    </UserProvider>
  );
}
