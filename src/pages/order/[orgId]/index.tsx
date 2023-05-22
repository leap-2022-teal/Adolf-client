import Footer from '@/components/footer';
import { MainLayout } from '@/components/MainLayout';
import { OrderContext } from '@/context/orderProvider';
import { UserContext, UserProvider } from '@/context/userProvider';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { OrgInfo, orderInfo } from '@/components/atoms';
import Image from 'next/image';
export default function OrderService() {
  const [sP, setSp] = useState<any>([]);
  const [service, setService] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();
  const { orgId } = router.query;
  var numeral = require('numeral');
  const [selectedService, setSelectedService] = useState<any>(undefined);
  const setUserSelectedService = useSetRecoilState(orderInfo);
  const setSelectedSPid = useSetRecoilState(OrgInfo);
  const [extraService, setExtraService] = useState<any>([]);

  const [show, setShow] = useState<any>();

  const [checkedServices, setCheckedServices] = useState<any>([]);
  const car =
    'h-[180px] w-[120px] rounded  border-1 border-black bg-gray-100   focus:bg-blue-500  text-gray-500 flex flex-col items-center cursor-pointer ';
  const setCar =
    'h-[180px] w-[120px] rounded  border-1 border-black  bg-blue-500 text-white flex flex-col items-center ';

  const normal =
    'h-[180px] w-[120px] border-1 border-black rounded bg-gray-100 hover:bg-blue-500 flex flex-col items-center text-gray-500 hover:text-white cursor-pointer ';

  useEffect(() => {
    if (orgId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/org/${orgId}`)
        .then((res) => {
          const { data, status } = res;
          if (status === 200) {
            setSp(data);
            // setSPinfo(data);
            setSelectedSPid(data);
          } else {
            alert('aldaa garlaa');
          }
        });
    }
  }, [orgId]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/service`)
      .then((res) => {
        setService(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/serviceExtra`)
      .then((res) => {
        setExtraService(res.data);
      });
  }, []);
  if (!sP) return <div>Уншиж байна...</div>;
  function handleSave(id: any) {
    const selectedServiceInfo = service.find((one: any) => one._id === id);
    console.log('enebna', selectedServiceInfo);
    setSelectedService(selectedServiceInfo);
    setShow(id);
  }

  const handleChange = (e: any) => {
    const { value, checked } = e.target;

    let newValue;
    if (checked) {
      newValue = [...checkedServices, value];
    } else {
      newValue = [...checkedServices].filter((e: any) => e !== value);
    }
    setCheckedServices(newValue);
  };
  console.log({ checkedServices });

  let selectedExtraService: any = [];
  function getEachServiceInfo() {
    const selectedServicesArray = checkedServices.map((one: any) => {
      const ServiceObjects = extraService.find(
        (service: any) => service._id === one
      );
      selectedExtraService.push(ServiceObjects);
    });
  }
  console.log({ selectedExtraService });

  function handleNext() {
    getEachServiceInfo();
    setUserSelectedService({
      selectedExtraService,
      selectedService,
    });
  }

  return (
    <UserProvider>
      <MainLayout>
        <div className="w-[400px] mx-auto h-screen ">
          <div>
            <h1 className="mb-2 text-xl font-large font-medium text-blue-500 ml-4">
              {sP.orgName}
            </h1>
          </div>
          {/* <p>{service.price}</p> */}
          <h5 className="text-slate-500 text-[15px] font-car ml-5 mb-2">
            Машины төрөл сонгох
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
            Үйлчилгээ сонгох
          </h5>
          <div className="w-[90%] h-[200px] mx-auto  overflow-x-auto  rounded mt-4 ">
            <div className="w-[400px]  flex gap-5 ">
              {service.map((service: any, index: number) => {
                if (service.orgId === orgId) {
                  if (service.carCategory === selectedCategory) {
                    return (
                      <div
                        key={service._id}
                        className={show === service._id ? setCar : car}
                        onClick={(e) => handleSave(service._id)}
                      >
                        <div className="w-[90%] h-[90px] mt-1  rounded mx-auto from-slate-400  ">
                          <img
                            src="/car-wash.png"
                            className="w-[100px] h-[80px] mx-auto"
                            alt=""
                          />
                        </div>
                        <h5 className="text-xl font-large font-medium ">
                          {service.name}
                        </h5>
                        <p>{numeral(service.price).format('0,0 ')} ₮</p>
                      </div>
                    );
                  }
                }
              })}
            </div>
          </div>
          <h5 className="text-slate-500 text-[15px] font-normal ml-5 mb-2">
            Нэмэлт үйлчилгээ
          </h5>
          <div className="w-[90%] h-[200px] mx-auto  overflow-x-auto  rounded mt-4 border-y  border-t-slate-200">
            <div className="flex flex-col gap-2 divide-y  divide-slate-200   ">
              {extraService.map((service: any, index: number) => {
                if (service.orgId === orgId) {
                  if (service.carCategory === selectedCategory) {
                    if (selectedService?.name !== 'Иж бүрэн') {
                      return (
                        <label
                          htmlFor={service.name}
                          key={service._id}
                          className="max-w-[500px] h-[100px] relative "

                          // onClick={(e) => handleSaveExtra(service._id)}
                        >
                          <div className=" flex items-center gap-4 mt-1  ">
                            <input
                              id={service.name}
                              type="checkbox"
                              name="services"
                              value={service._id}
                              onChange={handleChange}
                              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-5 "
                            />
                            <div className="w-[100%] ">
                              <h5> {service.name}</h5>
                              <p className="mt-[8px]">
                                {service.description.substring(0, 50)}
                              </p>
                            </div>
                          </div>

                          <div className=" absolute top-[6px] right-2   ">
                            {numeral(service.price).format('0,0 ')} ₮
                          </div>
                        </label>
                      );
                    }
                  }
                  // console.log({ selectedService });
                }
              })}
            </div>
          </div>
          <div>
            <div className="w-[100%] h-[80px]  mx-auto mt-10 flex justify-around gap-4 items-center">
              <Link
                href={`/`}
                className="rounded   bg-blue-500 w-[100px] h-[40px] text-white  flex justify-center items-center  "
              >
                Буцах
              </Link>
              <Link href={`/`}>
                <Image
                  src="/home-button.png "
                  width={42}
                  height={42}
                  alt="button"
                />
              </Link>
              <Link
                className="rounded  bg-blue-500 w-[120px] h-[40px] text-white  flex justify-center items-center  "
                href={`/order/${orgId}/calendar`}
                type="button"
                onClick={handleNext}
              >
                Үргэлжлүүлэх
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </UserProvider>
  );
}
