import { useState } from 'react';

export default function Calendar() {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

  return (
    <>
      <div className="w-[400px] h-screen  mx-auto">
        <h1 className="mb-2 text-xl font-large font-medium text-slate-700 ml-4 mt-5">
          Appointment date
        </h1>
        <h5 className="text-slate-500 text-[15px] font-normal ml-5 mb-2 mt-10">
          Select day
        </h5>
        <div className="w-[90%] h-[100px] mx-auto  overflow-x-auto   rounded mt-4">
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
      </div>
    </>
  );
}
