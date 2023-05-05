import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BsList, BsCarFrontFill } from 'react-icons/bs';
import { BiCalendar } from 'react-icons/bi';
import { CiCreditCard1, CiSearch } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { VscSignOut } from 'react-icons/vsc';
import { HiOutlineBell } from 'react-icons/hi';
import Link from 'next/link';
import axios from 'axios';

export default function Home() {
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [profilePicture, setProfilepicture] = useState('/blank-profile.png');
  const [test, setTest] = useState<any>([]);
  const onShow =
    'fixed top-0 ml-[-16px] mt-[-16px] left-0 z-40 h-screen p-4 overflow-y-auto transition-transform-translate-x-full bg-white max-w-[400px] w-[80%]  ';
  const onHide =
    'fixed top-0 ml-[-16px] mt-[-16px] left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white ';
  const hide = 'hidden';
  useEffect(() => {
    axios.get(`http://localhost:8000/sample`).then((res) => {
      setTest(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <div className="w-[400px] max-w-[1000px]  mt-[20px] bg-scroll  mx-auto ">
        <div className="flex justify-between">
          <div>
            <BsList
              className="w-[30px] h-[30px] ml-4"
              type="button"
              data-drawer-target="drawer-navigation"
              data-drawer-show="drawer-navigation"
              aria-controls="drawer-navigation"
              onClick={() => setShowDashboard(true)}
            />

            <div
              id="drawer-navigation"
              className={showDashboard ? onShow : onHide}
              aria-labelledby="drawer-navigation-label"
            >
              <div className="w-[100%] h-[25%] bg-blue-600 ">
                <img
                  src={profilePicture}
                  className=" w-[65px] h-[65px] rounded-[50%] border-1 border-slate-500 absolute top-[50px] left-10"
                />
                <h2 className="text-white font-normal text-lg absolute top-[125px] left-10">
                  Ricardo Dalitay
                </h2>
                <span className="text-slate-300 text-[11px] font-normal absolute top-[150px] left-10">
                  85340910
                </span>
              </div>
              <button
                onClick={() => setShowDashboard(false)}
                type="button"
                data-drawer-hide="drawer-navigation"
                aria-controls="drawer-navigation"
                className="text-white bg-transparent hover:bg-blue-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="py-4 overflow-y-auto">
                <ul className="space-y-4 font-medium">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 hover:text-blue-500 rounded-lg text-black hover:bg-blue-100"
                    >
                      <BsCarFrontFill className=" w-7 h-7 text-slate-400 " />

                      <span className="ml-3">Vehicles</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 hover:text-blue-500 rounded-lg text-black hover:bg-blue-100"
                    >
                      <BiCalendar className=" w-7 h-7 text-slate-400 " />

                      <span className="ml-3">Bookings</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 hover:text-blue-500 rounded-lg text-black hover:bg-blue-100"
                    >
                      <CiCreditCard1 className=" w-7 h-7 text-slate-400 " />

                      <span className="ml-3">Payment Methods</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 hover:text-blue-500 rounded-lg text-black hover:bg-blue-100"
                    >
                      <CgProfile className=" w-7 h-7 text-slate-400 " />

                      <span className="ml-3">My Profile</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 hover:text-red-500 rounded-lg text-black hover:bg-red-50 "
                    >
                      <VscSignOut className=" w-7 h-7 text-slate-400 " />

                      <Link href="/landingPage/home" className="ml-3">
                        Sign Out
                      </Link>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <HiOutlineBell className=" w-[25px] h-[30px] mr-4" />
          </div>
        </div>
        {showDashboard ? (
          hide
        ) : (
          <div>
            <div className="relative w-[100%] flex  mt-[20px]">
              <input
                type="text"
                className=" h-[30px] w-[80%] mx-auto placeholder:text-[#cbd5e1] placeholder:font-normal bg-white rounded-[10px] border-[1px] border-[#334155] outline-[none]  focus:outline-none text-black"
              />

              <CiSearch className="absolute top-1 right-[50px] w-5 h-5 " />
            </div>
            <div className="w-[100%] flex flex-col mt-[400px] h-[400px] overflow-y-auto gap-4">
              {test?.map((test: any) => (
                <div className="w-[90%] mx-auto p-6 bg-blue-100 border border-gray-200 rounded-lg shadow ">
                  <a href="#">
                    <h5 className="mb-2 text-xl font-large font-medium text-blue-500">
                      {test.name}
                    </h5>
                  </a>
                  <p className="font-normal text-gray-400 ">
                    {test.address.extraAddress}
                  </p>
                  <p className=" font-normal text-gray-400">
                    {test.phoneNumber}
                  </p>
                  <p className="mb-3 font-normal text-gray-400">
                    Mon - Sun <span> </span>
                    {test.timeTable.dayStart} - {test.timeTable.dayEnd}
                  </p>
                  <a
                    href={`/requestDetails/${test._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
