import { MainLayout } from '@/components/MainLayout';
import { OrderContext } from '@/context/orderProvider';
import { UserContext, UserProvider } from '@/context/userProvider';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { textSpanContainsPosition } from 'typescript';

export default function OrderService() {
  const [sP, setSp] = useState<any>([]);
  const [service, setService] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();
  const { id } = router.query;
  const [selectedService, setSelectedService] = useState<any>(undefined);
  // const { addToOrder, order } = useContext(UserContext);
  const { addToOrder, setSPinfo } = useContext(OrderContext);
  const car =
    'h-[180px] w-[120px] rounded  border-1 border-black bg-gray-100   focus:bg-blue-500  text-gray-500 flex flex-col items-center ';
  const setCar =
    'h-[180px] w-[120px] rounded  border-1 border-black  bg-blue-500 text-white flex flex-col items-center ';

  const normal =
    'h-[180px] w-[120px] border-1 border-black rounded bg-gray-100 hover:bg-blue-500 flex flex-col items-center text-gray-500 hover:text-white ';
  console.log(id);
  console.log('service', service);
  useEffect(() => {
    if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/serviceProvider/${id}`
        )
        .then((res) => {
          const { data, status } = res;
          if (status === 200) {
            setSp(data);
            setSPinfo(data);
          } else {
            alert('aldaa garlaa');
          }
        });
    }
  }, [id]);
  console.log(selectedService);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/service`)
      .then((res) => {
        setService(res.data);
        console.log(res.data);
      });
  }, []);
  if (!sP) return <div>Loading...</div>;
  function handleSave(id: any) {
    const selectedServiceInfo = service.find((one: any) => one._id === id);
    console.log('enebna', selectedServiceInfo);
    setSelectedService(selectedServiceInfo);
  }
  return (
    <UserProvider>
      <MainLayout>
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
                <img
                  src="/sedan.png"
                  className="w-[100px] h-[100px]  "
                  alt=""
                />
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
                <img
                  src="/suv.png"
                  className="w-[80px] mt-2 h-[80px]  "
                  alt=""
                />
                <h5 className="text-xl font-large font-medium mt-3 ">
                  SUV/4WD
                </h5>
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
              {service.map((service: any, index: number) => {
                if (service.carCategory === selectedCategory) {
                  return (
                    <div
                      key={service._id}
                      className={normal}
                      onClick={(e) => handleSave(service._id)}
                    >
                      <div className="w-[90%] h-[90px] mt-1  rounded mx-auto from-slate-400">
                        <img
                          src="/car-wash.png"
                          className="w-[100px] h-[80px] mx-auto"
                          alt=""
                        />
                      </div>
                      <h5 className="text-xl font-large font-medium ">
                        {service.name}
                      </h5>
                      <p>{service.price}₮</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          {/* <button onClick={addToOrder(service.price)}> Next </button> */}
          <Link
            className="rounded  ml-[25px] bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center mt-5 "
            href={`/calendar`}
            type="button"
            onClick={addToOrder(selectedService)}
          >
            Next
          </Link>
        </div>
        {/* <Link href={`/calendar`}>next</Link> */}
      </MainLayout>
    </UserProvider>
  );
}
