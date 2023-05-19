import Link from 'next/link';
import { useContext } from 'react';
import AppContext from '@/context/AppContext';
export default function RegistrationNumber() {
  const context = useContext<any>(AppContext);

  return (
    <>
      <div className="w-[400px] flex flex-col items-center gap-[20px] mt-[20px] mx-auto">
        <div className="w-[150px] h-[150px] mx-auto mt-[40px]">
          <img src="/car-wash.png" alt="logo" />
        </div>
        <h1 className="text-black  flex justify-center my-[10px] tracking-[0.5px] text-[22px] font-medium">
          Бүртгүүлэх
        </h1>
        <span className="flex justify-center mt-[-30px] text-slate-500 text-[11px] font-light ">
          Бид таны утасны дугаар луу баталгаажуулалтын код явуулах болно
        </span>
        <input
          type="text"
          placeholder="Утасны дугаар"
          value={context.phone}
          maxLength={8}
          onChange={(e) => context.setPhone(e.target.value)}
          className=" placeholder:text-[#cbd5e1] placeholder:font-normal bg-white rounded-[10px] border-[1px] border-[#334155] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none text-black mt-[20px] "
        />
        <Link
          href="/registrationInfo"
          className=" text-white h-[2.5rem] w-[80%] bg-sky-600 text:flex rounded-[10px] cursor-pointer "
        >
          <span className="flex justify-center pt-[6px]"> Үргэлжлүүлэх</span>
        </Link>

        <Link
          href="/login"
          className="my-[10px] text-[13px] tracking-[0.1rem] text-sky-500  mt-[40px]"
        >
          <span className="text-slate-400">Та аль хэдийн бүртгэлтэй юу?</span>
          <span> </span>
          Нэвтрэх
        </Link>
      </div>
    </>
  );
}
