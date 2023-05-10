import { useContext, useState } from 'react';
import { BsList, BsCarFrontFill } from 'react-icons/bs';
import { BiCalendar } from 'react-icons/bi';
import { CiCreditCard1, CiSearch } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { VscSignOut } from 'react-icons/vsc';
import { useRouter } from 'next/router';
import { HiOutlineBell } from 'react-icons/hi';
import { UserContext } from '@/context/userProvider';
export function UserSideBar() {
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [profilePicture, setProfilepicture] = useState('/blank-profile.png');
  const user = useContext<any>(UserContext);
  const router = useRouter();
  const onShow =
    'fixed top-0 ml-[-16px] mt-[-16px] left-0 z-40 h-screen p-4 overflow-y-auto transition-transform-translate-x-full bg-white max-w-[400px] w-[80%]  ';
  const onHide =
    'fixed top-0 ml-[-16px] mt-[-16px] left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white ';
  const hide = 'hidden';
  function handleSignOut() {
    localStorage.removeItem('loginToken');
    router.push('/login');
    return <>some</>;
  }
  return (
    <>
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
                {user.lastName} {user.firstName}
              </h2>
              <span className="text-slate-300 text-[11px] font-normal absolute top-[150px] left-10">
                {user.phoneNumber}
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
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
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

                    <a onClick={handleSignOut} className="ml-3">
                      Sign Out
                    </a>
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
    </>
  );
}