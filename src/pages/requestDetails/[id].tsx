import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { textSpanContainsPosition } from 'typescript';
export default function RequestDeatails() {
  const [sP, setSp] = useState<any>([]);
  const [service, setService] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();
  const { id } = router.query;

  const car =
    'h-[180px] w-[120px] rounded  border-1 border-black bg-gray-100   focus:bg-blue-500  text-gray-500 flex flex-col items-center ';
  const setCar =
    'h-[180px] w-[120px] rounded  border-1 border-black  bg-blue-500 text-white flex flex-col items-center ';

  const normal =
    'h-[180px] w-[120px] border-1 border-black rounded bg-gray-100 hover:bg-blue-500 flex flex-col items-center text-gray-500 hover:text-white ';
  console.log(id);
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/serviceProvider/${id}`).then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setSp(data);
        } else {
          alert('aldaa garlaa');
        }
      });
    }
  }, [id]);
  console.log(service);
  useEffect(() => {
    axios.get(`http://localhost:8000/request`).then((res) => {
      setService(res.data);
      console.log(res.data);
    });
  }, []);
  if (!sP) return <div>Loading...</div>;

  return (
    <>
      <div className="w-[400px] mx-auto h-screen ">
        <div>
          <h1 className="mb-2 text-xl font-large font-medium text-blue-500 ml-4">
            {sP.name}
          </h1>
        </div>
        <p>{service.price}</p>
        <h5 className="text-slate-500 text-[15px] font-car ml-5 mb-2">
          Select vehicle
        </h5>
        <div className="w-[90%] h-[200px] mx-auto  overflow-x-auto  rounded ">
          <div className="w-[600px]  flex gap-5 ">
            <div
              onClick={() => setSelectedCategory('SEDAN')}
              className={selectedCategory === 'SEDAN' ? setCar : car}
            >
              <img src="/sedan.png" className="w-[100px] h-[100px]  " alt="" />
              <h5 className="text-xl font-large font-medium ">SEDAN</h5>
            </div>

            <div
              onClick={() => setSelectedCategory('S/W')}
              className={selectedCategory === 'S/W' ? setCar : car}
            >
              <img src="/cuv.png" className="w-[100px] h-[100px]  " alt="" />
              <h5 className="text-xl font-large font-medium ">S/W</h5>
            </div>
            <div
              onClick={() => setSelectedCategory('SUV/4WD')}
              className={selectedCategory === 'SUV/4WD' ? setCar : car}
            >
              <img src="/suv.png" className="w-[80px] mt-2 h-[80px]  " alt="" />
              <h5 className="text-xl font-large font-medium mt-3 ">SUV/4WD</h5>
            </div>
            <div
              onClick={() => setSelectedCategory('X-LARGE')}
              className={selectedCategory === 'X-LARGE' ? setCar : car}
            >
              <img
                src="/pickup-truck.png"
                className="w-[100px] h-[100px]  "
                alt=""
              />
              <h5 className="text-xl font-large font-medium ">X-LARGE</h5>
            </div>
          </div>
        </div>
        <h5 className="text-slate-500 text-[15px] font-normal ml-5 mb-2">
          Select package
        </h5>
        <div className="w-[90%] h-[200px] mx-auto  overflow-x-auto  rounded mt-4 ">
          <div className="w-[400px]  flex gap-5 ">
            {service.map((e: any) => {
              if (e.carCategory === selectedCategory) {
                return (
                  <div className={normal}>
                    <div className="w-[90%] h-[90px] mt-1  rounded mx-auto from-slate-400">
                      <img
                        src="/car-wash.png"
                        className="w-[100px] h-[80px] mx-auto"
                        alt=""
                      />
                    </div>
                    <h5 className="text-xl font-large font-medium ">
                      {e.name}
                    </h5>
                    <p>{e.price}₮</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
