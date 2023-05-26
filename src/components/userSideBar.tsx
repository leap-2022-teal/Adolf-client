import { useContext, useState } from 'react';
import { BsList, BsCarFrontFill } from 'react-icons/bs';
import { BiCalendar } from 'react-icons/bi';
import { CiCreditCard1, CiSearch } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { VscSignOut } from 'react-icons/vsc';
import { useRouter } from 'next/router';
import { HiOutlineBell } from 'react-icons/hi';
import { UserContext } from '@/context/userProvider';
import Link from 'next/link';
export function UserSideBar() {
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  const user = useContext<any>(UserContext);
  const router = useRouter();
  const onShow =
    'fixed top-0 ml-[-16px] mt-[-16px] z-40 h-screen p-4 overflow-y-auto transition-transform-translate-x-full bg-white max-w-[400px] w-[80%]  ';
  const onHide = 'hidden';
  const hide = 'hidden';
  function handleSignOut() {
    localStorage.removeItem('loginToken');
    window.location.reload();
  }
  const blank = '/blank-profile.jpeg';
  return (
    <>
      <div className="flex justify-between max-w-[500px] mx-auto mt-5">
        <div>
          <BsList
            className="w-[30px] h-[30px] ml-5 cursor-pointer text-blue-500 "
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
            <div className="w-[500px] border-2 h-[25%] bg-blue-500 relative ">
              <img
                src={user?.image === undefined ? blank : user?.image}
                // src={user?.image}
                className=" w-[65px] h-[65px] rounded-[50%] border-1 border-gray-500 absolute top-[50px] border-2 border-white left-10"
              />
              <h2 className="text-white font-normal text-lg absolute top-[120px] left-10">
                {user?.firstName} {user?.lastName}
              </h2>
              <span className="text-gray-300 text-[11px] font-normal absolute top-[140px] left-10">
                {user?.phoneNumber}
              </span>
            </div>
            <button
              onClick={() => setShowDashboard(false)}
              type="button"
              data-drawer-hide="drawer-navigation"
              aria-controls="drawer-navigation"
              className="text-white bg-transparent hover:bg-blue-500 hover:text-gray-900 rounded-lg text-sm absolute top-6 right-2 inline-flex items-center "
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
                  <Link
                    href="#"
                    className=" group flex items-center p-2 group-hover:text-blue-500 rounded-lg text-black hover:bg-blue-100"
                  >
                    <BsCarFrontFill className=" w-7 h-7 text-gray-500 group-hover:text-blue-500 " />

                    <span className="ml-3 text-gray-700 group-hover:text-blue-500 ">
                      Машины мэдээлэл
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex items-center p-2 group-hover:text-blue-500  rounded-lg text-black hover:bg-blue-100"
                  >
                    <BiCalendar className=" w-7 h-7 text-gray-500 group-hover:text-blue-500  " />

                    <span className="ml-3 text-gray-700">Захиалгууд</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=" group flex items-center p-2 group-hover:text-blue-500 rounded-lg text-black hover:bg-blue-100"
                  >
                    <CiCreditCard1 className=" w-7 h-7 text-gray-500 group-hover:text-blue-500  " />

                    <span className="ml-3 text-gray-700">Төлбөрийн систем</span>
                  </a>
                </li>
                <li>
                  <Link
                    href="/userProfile"
                    className="group flex items-center p-2 text-gray-500  group-hover:text-blue-500 rounded-lg text-black hover:bg-blue-100"
                  >
                    <CgProfile className=" w-7 h-7  group-hover:text-blue-500 " />

                    <span className="ml-3 text-gray-700 group-hover:text-blue-500">
                      {' '}
                      Тохиргоо
                    </span>
                  </Link>
                </li>
                <li>
                  <div
                    // href="#"
                    className="group flex items-center p-2 group-hover:text-red-500 rounded-lg text-black hover:bg-red-50 cursor-pointer "
                    onClick={handleSignOut}
                  >
                    <VscSignOut className=" w-7 h-7 text-gray-500  group-hover:text-red-500" />

                    <a className="ml-3 text-gray-700  group-hover:text-red-500">
                      Гарах
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <HiOutlineBell className=" w-[25px] h-[30px] mr-6 cursor-pointer text-blue-500" />
        </div>
      </div>
    </>
  );
}
