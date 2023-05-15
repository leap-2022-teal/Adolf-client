import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserProvider } from '@/context/userProvider';
import { MainLayout } from '@/components/MainLayout';
import { OrderContext } from '@/context/orderProvider';
import Link from 'next/link';
import Footer from '@/components/footer';
import * as dayjs from 'dayjs';
import * as isLeapYear from 'dayjs/plugin/isLeapYear';
import { useRecoilState } from 'recoil';
import { selectedDateInfo } from '@/pages/atoms';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
} from 'react-icons/ai';
export default function Calendar() {
  // var new =  dayjs('2018-08-08');
  // var now = dayjs();
  // console.log(now);
  const [start, setStart] = useState<any>();
  console.log('startsh', start);
  const router = useRouter();
  const { orgId } = router.query;
  const [selectCalendar, setSelectCalendar] = useState<any>();
  const [orderDate, SetorderDate] = useState<any>();
  const [selectTime, setSelectTime] = useState<any>({});
  const [back, setBack] = useState<any>();
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateInfo);
  const { addToOrder, setSPinfo, SPinfo, setUserSelectedDate } =
    useContext(OrderContext);
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
  const example = new Date('<YYYY-mm-dd>');
  console.log(example, 'this');
  const days: any = getDaysArray(startDay, end);

  // const getTimes = () => {
  useEffect(() => {
    if (orgId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/serviceProvider/${orgId}`
        )
        .then((res) => {
          if (res.data.timeTable) {
            setStart(res.data.timeTable);
            console.log(res.data);
          }
        });
    }
  }, []);

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
  // function selectedDate(date: any) {
  //   const MD = selectCalendar?.toString().slice(0, 10);
  //   console.log('date', MD);
  //   setSelectCalendar(date);
  // }
  function orderedDate(date: any) {
    setSelectCalendar(date);
    SetorderDate(dayjs(date).format('DD/MM/YYYY'));
  }
  // console.log(orderDate, selectTime);
  const DateTime = [];
  if (orderDate && selectTime) {
    DateTime.push(orderDate, selectTime);
    // console.log('ss', typeof selectTime);
  }
  console.log(DateTime);
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
              {days.map((date: any, index: number) => {
                date.getDate();
                // console.log(date, 'e');
                let day = weekDays[date.getDay()];

                return (
                  <p
                    key={index}
                    className={
                      selectCalendar?.toString().slice(0, 10) ===
                      date.toString().slice(0, 10)
                        ? active
                        : normal
                    }
                    // onClick={() => selectedDate(date)}
                    onClick={() => orderedDate(date)}
                  >
                    <span className="mt-3">{day}</span>
                    <span className=" text-xl font-large font-medium">
                      {date.getDate()}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
          <h5 className="text-slate-500 text-[15px] font-normal ml-10 mb-2 mt-4">
            Select time
          </h5>
          <div className=" w-[80%] mx-auto  ">
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
          </div>
          <div>
            <div className="w-[100%] h-[80px] border-2 border-black mx-auto mt-10 flex justify-center gap-4 items-center">
              {/* <div
            className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
            onClick={() => router.back}
          >
            Back
          </div> */}
              <Link
                href={`/order/${orgId}`}
                className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
              >
                Back
              </Link>
              <Link href={`/`}>
                <AiOutlineHome className="w-[30px] h-[30px] " type="button" />
              </Link>
              <Link
                className="rounded  bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
                href={`/order/${orgId}/summary`}
                type="button"
                onClick={() => setSelectedDate(DateTime)}
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </UserProvider>
  );
}
// onClick={() => setSelectedDate(DateTime)}
{
  /* <Footer
prev={`/order/${orgId}`}
next={`/order/${orgId}/summary`}
/>
<button onClick={() => setSelectedDate(DateTime)}> save </button> */
}
{
  /* <Footer next={'summary'} prev ={""} /> */
}
