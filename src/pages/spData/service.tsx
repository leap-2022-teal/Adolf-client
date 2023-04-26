import axios from 'axios';
import { use, useState } from 'react';
interface ServiceData {
  name: string;
  price: number;
  description: string;
  durationTime: string;
  carCategory: string;
}

export default function Service() {
  const [serviceData, setServiceData] = useState<ServiceData>({
    carCategory: '',
    name: '',
    price: 0,
    description: '',
    durationTime: '',
  });

  function handleInputChange(evt: any) {
    const value = evt.target.value;
    setServiceData({
      ...serviceData,
      [evt.target.name]: value,
    });
  }

  function handleSubmit() {
    axios
      .post(`http://localhost:8000/spData/service`, serviceData)
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          alert('Success');
        }
      });
    console.log(serviceData);
  }
  return (
    <>
      <div>
        <div className="mb-6">
          <select
            name="carCategory"
            id=""
            value={serviceData.carCategory}
            onChange={handleInputChange}
          >
            <option selected>mashinii torol</option>
            <option value="SEDAN">SEDAN</option>
            <option value="S/W">S/W</option>
            <option value="SUV/4WD">SUV/4WD</option>
            <option value="X-LARGE">X-LARGE</option>
          </select>
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Name
          </label>
          <input
            name="name"
            value={serviceData.name}
            onChange={handleInputChange}
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[600px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Price
          </label>
          <input
            name="price"
            value={serviceData.price}
            onChange={handleInputChange}
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[600px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Description
          </label>
          <input
            name="description"
            value={serviceData.description}
            onChange={handleInputChange}
            type="text"
            id="large-input"
            className="block w-[600px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Duration Time
          </label>
          <input
            name="durationTime"
            value={serviceData.durationTime}
            onChange={handleInputChange}
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[600px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            onClick={handleSubmit}
            className=" w-[150px] h-[40px] border-[2px] mx-auto mt-[40px] bg-green-600 border-none text-white rounded-[10px]"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
