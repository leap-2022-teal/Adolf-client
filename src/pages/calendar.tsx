import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Calendar() {
  const [start, setStart] = useState<any>();
  const router = useRouter();
  const { id } = router.query;
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // const [date, setDate] = useState<DateType>({
  //   justDate: null,
  //   dateTime: null,
  // });
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
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/serviceProvider/644a2c85e6ed7a2e0703a199`
      )
      .then((res) => {
        if (res.data.timeTable) {
          setStart(res.data.timeTable);
          console.log(res.data);
        }
      });
  }, []);

  const beginning = Number(start?.dayStart.substring(0, 2));
  const close = Number(start?.dayEnd.substring(0, 2));
  const times = [];
  for (let i = beginning; i <= close; i++) {
    times.push(`${i}:00 - ${i + 1}:00`);
  }
  //
  // };
  console.log(times);
  // const times = getTimes();
  return (
    <>
      <div className="w-[400px] h-screen  mx-auto">
        <h1 className="mb-2 text-xl font-large font-medium text-slate-700 ml-8 mt-5">
          Appointment date
        </h1>
        <h5 className="text-slate-500 text-[15px] font-normal ml-10 mb-2 mt-10">
          Select day
        </h5>
        <div className="w-[80%] h-[100px] mx-auto  overflow-x-auto   rounded mt-4">
          <div className="w-[750px]  flex gap-5 ">
            {days.map((e: any) => {
              e.getDate();
              let day = weekDays[e.getDay()];

              return (
                <p className=" flex flex-col border-2 text-gray-500 bg-gray-100  w-[50px] h-[80px]  items-center rounded">
                  <span className="mt-3">{day}</span>
                  <span className=" text-xl font-large font-medium">
                    {e.getDate()}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
        <div className=" w-[80%] h-screen mx-auto  ">
          <div className=" grid grid-cols-2 gap-2 ">
            {times?.map((time: any, i: number) => (
              <div key={`time-${i}`} className="rounded bg-gray-100 h-8    ">
                <div className="h-2 w-[110px] pt-1  mx-auto">{time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
