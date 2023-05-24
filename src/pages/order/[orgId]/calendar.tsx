import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserProvider } from '@/context/userProvider';
import { MainLayout } from '@/components/MainLayout';
import { OrderContext } from '@/context/orderProvider';
import Link from 'next/link';
import Footer from '@/components/footer';
import dayjs from 'dayjs';
import * as isLeapYear from 'dayjs/plugin/isLeapYear';
import { useRecoilState } from 'recoil';
import { selectedDateInfo } from '@/components/atoms';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
} from 'react-icons/ai';
import Image from 'next/image';
import { Example } from '@/context/StepperContext';
import StepperComponents from '@/components/stepper';
import AppContext from '@/context/AppContext';
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
  const weekDays = ['Ням', 'Дав', 'Мяг', 'Лха', 'Пүр', 'Баа', 'Бям'];
  const normal =
    ' flex flex-col border-2 text-gray-600 bg-gray-100  w-[50px] h-[80px]  items-center rounded cursor-pointer';
  const active =
    ' flex flex-col border-2 text-white bg-blue-500  w-[50px] h-[80px]  items-center rounded';
  const normalTime = 'rounded bg-gray-100 h-8 text-gray-600 cursor-pointer  ';
  const activeTime = 'rounded bg-blue-500 h-8 text-white  ';
  const red = 'rounded bg-red-500 h-8 text-white';
  const step = useContext<any>(AppContext);
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
        .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/org/${orgId}`)
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
  const DateTime: any[] = [];
  if (orderDate && selectTime) {
    DateTime.push(orderDate, selectTime);
    // console.log('ss', typeof selectTime);
  }
  console.log(DateTime);

  const handleClick = () => {
    setSelectedDate(DateTime);
    step?.handleNext();
  };
  return (
    <UserProvider>
      <MainLayout>
        <div className="w-[400px] h-screen  mx-auto">
          <StepperComponents />
          <h1 className="mb-2 text-xl font-large font-medium text-gray-700 ml-10 mt-5">
            Захиалгын огноо сонгох
          </h1>
          <h5 className="text-gray-600 text-[15px] font-normal ml-10 mb-2 mt-10">
            Та өдрөө сонгоно уу!!
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
          <h5 className="text-gray-600 text-[15px] font-normal ml-10 mb-2 mt-4">
            Цаг сонгох
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
            <div className="w-[85%] h-[80px]  mx-auto mt-10 flex justify-around gap-4 items-center">
              <Link
                href={`/order/${orgId}`}
                className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
                onClick={step?.handlePrev}
              >
                Буцах
              </Link>
              <Link href={`/`} onClick={step?.handleHome}>
                {/* <AiOutlineHome className="w-[30px] h-[30px] " type="button" /> */}
                <Image
                  src="/home-button.png "
                  width={42}
                  height={42}
                  alt="button"
                />
              </Link>
              <Link
                className="rounded  bg-blue-500 w-[120px] h-[40px] text-white  flex justify-center items-center  "
                href={`/order/${orgId}/summary`}
                type="button"
                onClick={handleClick}
              >
                Үргэлжлүүлэх
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </UserProvider>
  );
}
