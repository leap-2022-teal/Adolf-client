import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { textSpanContainsPosition } from 'typescript';
export default function RequestDeatails() {
  const [sP, setSp] = useState<any>([]);
  const [service, setService] = useState<any>([]);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  // const query = router.query
  // console.log(param);
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/sample/${id}`).then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setSp(data);
        } else {
          alert('aldaa garlaa');
        }
      });
    }
  }, [id]);
  useEffect(() => {
    axios.get(`http://localhost:8000/request`).then((res) => {
      setService(res.data);
      console.log(res.data);
    });
  }, []);
  if (!sP) return <div>Loading...</div>;
  if (!sP) return <div>Loading...</div>;
  if (!sP) return <div>Loading...</div>;
  return (
    <>
      <div className="w-[400px] mx-auto h-screen  ">
        <h1>Request details</h1>

        <div>
          <h1>{sP.name}</h1>
        </div>
        <h5>Select vehicle</h5>
        <div className="w-[90%] h-[200px] mx-auto  overflow-x-auto  rounded ">
          <div className="w-[600px]  flex gap-5 ">
            <div className="h-[180px] w-[120px] rounded  border-1 border-black bg-gray-100 focus:outline-none  hover:bg-blue-500 text-gray-500 hover:text-white flex flex-col items-center   ">
              <img src="/sedan.png" className="w-[100px] h-[100px]  " alt="" />
              <h5 className="text-xl font-large font-medium ">SEDAN</h5>
            </div>
            <div className="h-[180px] w-[120px] rounded  border-1 border-black bg-gray-100 hover:bg-blue-500  text-gray-500 hover:text-white flex flex-col items-center   ">
              <img src="/cuv.png" className="w-[100px] h-[100px]  " alt="" />
              <h5 className="text-xl font-large font-medium ">S/W</h5>
            </div>
            <div className="h-[180px] w-[120px] rounded  border-1 border-black bg-gray-100 hover:bg-blue-500  text-gray-500 hover:text-white flex flex-col items-center  ">
              <img src="/suv.png" className="w-[80px] mt-2 h-[80px]  " alt="" />
              <h5 className="text-xl font-large font-medium mt-3 ">SUV/4WD</h5>
            </div>
            <div className="h-[180px] w-[120px] rounded  border-1 border-black bg-gray-100 hover:bg-blue-500  text-gray-500 hover:text-white flex flex-col items-center  ">
              <img
                src="/pickup-truck.png"
                className="w-[100px] h-[100px]  "
                alt=""
              />
              <h5 className="text-xl font-large font-medium ">X-LARGE</h5>
            </div>
          </div>
        </div>
        <h5>Select package</h5>
        <div className="w-[90%] h-[200px] mx-auto  overflow-x-auto  rounded mt-4 ">
          <div className="w-[400px]  flex gap-5 ">
            <div className="h-[180px] w-[120px] border-1 border-black rounded bg-gray-100 hover:bg-blue-500 flex flex-col items-center text-gray-500 hover:text-white ">
              <div className="w-[90%] h-[90px] mt-1  rounded mx-auto from-slate-400">
                <img
                  src="/car-wash.png"
                  className="w-[100px] h-[80px] mx-auto"
                  alt=""
                />
              </div>
              <h5 className="text-xl font-large font-medium ">Gadar</h5>
            </div>
            <div className="h-[180px] w-[120px] border-1 border-black rounded bg-gray-100 hover:bg-blue-500 flex flex-col items-center text-gray-500 hover:text-white ">
              <div className="w-[90%] h-[90px] mt-1  rounded mx-auto from-slate-400">
                <img
                  src="/car-wash.png"
                  className="w-[100px] h-[80px] mx-auto"
                  alt=""
                />
              </div>
              <h5 className="text-xl font-large font-medium ">Buten</h5>
            </div>
            <div className="h-[180px] w-[120px] border-1 border-black rounded bg-gray-100 hover:bg-blue-500 flex flex-col items-center text-gray-500 hover:text-white ">
              <div className="w-[90%] h-[90px] mt-1  rounded mx-auto from-slate-400">
                <img
                  src="/car-wash.png"
                  className="w-[100px] h-[80px] mx-auto"
                  alt=""
                />
              </div>
              <h5 className="text-xl font-large font-medium ">Change</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
