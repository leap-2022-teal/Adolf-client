import axios from 'axios';
import { useEffect, useState } from 'react';

export function SPlist() {
  const [spList, setspList] = useState<any>();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/serviceProvider`)
      .then((res) => {
        setspList(res.data);
        console.log(res.data);
      });
  }, []);
  return (
    <>
      <div className="w-[100%] flex flex-col mt-[400px] h-[400px] overflow-y-auto gap-4">
        {spList?.map((spList: any, index: number) => (
          <div
            key={index}
            className="w-[90%] mx-auto p-6 odd:bg-blue-100  even:bg-slate-50 border border-gray-200 rounded-lg shadow "
          >
            <a href="#">
              <h5 className="mb-2 text-xl font-large font-medium text-blue-500">
                {spList.name}
              </h5>
            </a>
            <p className="font-normal text-gray-400 ">
              {spList.address.extraAddress}
            </p>
            <p className=" font-normal text-gray-400">{spList.phoneNumber}</p>
            <p className="mb-3 font-normal text-gray-400">
              Mon - Sun <span> </span>
              {spList.timeTable.dayStart} - {spList.timeTable.dayEnd}
            </p>
            <a
              href={`/order/${spList._id}`}
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
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
