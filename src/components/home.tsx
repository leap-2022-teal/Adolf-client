import { useContext } from 'react';
import { CiSearch } from 'react-icons/ci';
import Map from '@/components/Map';
import { SPlist } from './SPlist';
import { UserContext } from '@/context/userProvider';
import { UserSideBar } from './userSideBar';
import Footer from './footer';
export default function HomePage() {
  const user = useContext<any>(UserContext);
  console.log(user);
  if (user === undefined) return null;
  return (
    <>
      <div className="max-w-[500px] mt-[20px] bg-scroll  mx-auto ">
        <div>
          <div className="relative w-[100%] flex  mt-[20px] mb-7">
            <input
              type="text"
              className=" h-[30px] w-[90%] mx-auto placeholder:text-[#cbd5e1] placeholder:font-normal bg-white rounded-[10px] border-[1px] border-[#334155] outline-[none]  focus:outline-none text-black"
            />
            <CiSearch className="absolute top-1 right-[50px] w-5 h-5 " />
          </div>
        </div>
        <Map />

        <SPlist />
      </div>
    </>
  );
}
