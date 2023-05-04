import Link from 'next/link';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Image from 'next/image';
import { LastTextLineData } from 'ckeditor5/src/typing';
interface FormValues {
  phoneNumber: string;
  password: string;
  name: string;
  image: string;
  district: string;
  address: string;
  description: string;
  mondayFriday: string;
  saturdaySunday: string;
  closeMonday: string;
  closeSaturdaySunday: string;
  discountType: string;
  discountValue: string;
  socailAddress: string;
  location: {
    type: 'Point';
    coordinates: [string, string];
  };
}
const denver = { type: 'Point', coordinates: [-104.9903, 39.7392] };
function SpData() {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<any>('');
  const [formValues, setFormValues] = useState<FormValues>({
    phoneNumber: '',
    password: '',
    name: '',
    image: '',
    district: '',
    address: '',
    description: '',
    mondayFriday: '',
    saturdaySunday: '',
    closeMonday: '',
    closeSaturdaySunday: '',
    discountType: '',
    discountValue: '',
    socailAddress: '',
    location: { type: 'Point', coordinates: ['', ''] },
  });
  function handleInputChange(evt: any) {
    const value = evt.target.value;
    console.log(evt.target.name);
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
  }

  async function handleFileUpload(event: any) {
    setUploading(true);
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile); //formData.append(name, value) – add a form field with the given name and value,
    await fetch('http://localhost:8000/upload-image', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
        setFormValues({
          ...formValues,
          image: data.path,
        });
        setUploading(false);
      });
  }
  const handleSubmit = async () => {
    axios
      .post(`http://localhost:8000/sample/spData`, formValues)
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          alert('Success');
        }
      });
    console.log(formValues);
    // Handle form submission logic here
  };

  return (
    <>
      <div className="flex flex-col w-[800px] h-[100%] border-[3px] border-green-600 sm-[400px]">
        <div className="flex items-center mt-4 flex-col mx-auto">
          <h1 className=" font-semibold">ProfilePicture</h1>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileUpload}
            className=" file:bg-green-600  ml-[120px] file:border-none file:h-[40px] file:w-[100px] file:text-white file:rounded-[20px] mt-[10px]"
          />
          {uploading && (
            <div className="border-4 border-red-600" role="status"></div>
          )}

          {image && (
            <Image src={image.path} width="100" height="150" alt="upload" />
          )}
        </div>

        <div className="flex flex-col items-center gap-[10px] ">
          <input
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            type="text"
            placeholder="Бүртгэлтэй дугаар"
            className="w-[400px] h-[40px]  border-[2px] rounded-[10px]  placeholder:pl-[10px] border-black mt-[40px] focus:pl-[10px] "
          />
          <input
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            type="text"
            placeholder="pass"
            className="w-[400px] h-[40px]  border-[2px] rounded-[10px]  placeholder:pl-[10px] border-black mt-[40px] focus:pl-[10px] "
          />
          <input
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            type="text"
            placeholder="Байгууллагын нэр"
            className="w-[400px] h-[40px]  border-[2px] rounded-[10px]  placeholder:pl-[10px] border-black mt-[40px] focus:pl-[10px] "
          />

          <div className="flex flex-col gap-[10px]">
            <select
              value={formValues.district}
              name="district"
              id=""
              onChange={handleInputChange}
              className="w-[400px] h-[40px] rounded-[10px] border-[2px] border-black  "
            >
              <option selected>Дүүрэг сонгох</option>
              <option value="Баянзүрх">УБ-Баянзүрх</option>
              <option value="Налайх">УБ-Налайх</option>
              <option value="Сонгинохайрхан">УБ-Сонгинохайрхан</option>
              <option value="Сүхбаатар">УБ-Сүхбаатар</option>
              <option value="Хан-Уул">УБ-Хан-Уул</option>
              <option value="Чингэлтэй">УБ-Чингэлтэй</option>
              <option value="Багануур">УБ-Багануур</option>
              <option value="Багахангай">УБ-Багахангай</option>
              <option value="Баянгол">УБ-Баянгол</option>
              <option value="Дархан">Дархан</option>
              <option value="Эрдэнэт">Эрдэнэт</option>
            </select>

            <input
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              placeholder="bairshil nemelt medeelel"
              className="border-[2px] border-black w-[400px] rounded-[10px]"
            ></input>
            <input
              name="socailAddress"
              value={formValues.socailAddress}
              onChange={handleInputChange}
              placeholder="social Address"
              className="border-[2px] border-black w-[400px] rounded-[10px]"
            ></input>
            <div className="flex gap-[38px]">
              <input
                name="location.coordinates[0]"
                type="text"
                placeholder="Lat"
                value={formValues.location.coordinates[0]}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    location: {
                      type: 'Point',
                      coordinates: [
                        e.target.value,
                        formValues.location.coordinates[1],
                      ],
                    },
                  })
                }
                className="border-[2px] border-black h-[40px] rounded-[10px]"
              />
              <input
                name="location.coordinates[1]"
                type="text"
                placeholder="Long"
                value={formValues.location.coordinates[1]}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    location: {
                      type: 'Point',
                      coordinates: [
                        formValues.location.coordinates[0],
                        e.target.value,
                      ],
                    },
                  })
                }
                className="border-[2px] border-black h-[40px] rounded-[10px]"
              />
            </div>
          </div>
        </div>
        <div>
          <textarea
            name="description"
            className=" file:bg-green-600  ml-[120px] file:border-none file:h-[40px] file:w-[100px] file:text-white file:rounded-[20px] mt-[10px] min-w-[400px] h-[200px] border-4 border-black-400 border-solid"
            value={formValues.description}
            placeholder="tailbar"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <div className="flex flex-col items-center ">
            <div>
              <label htmlFor="monday">Даваа-Баасан </label>

              <input
                className="border-[1px] border-black"
                type="time"
                value={formValues.mondayFriday}
                onChange={handleInputChange}
                name="mondayFriday"
              />
              <input
                className="border-[1px] border-black"
                type="time"
                value={formValues.closeMonday}
                onChange={handleInputChange}
                name="closeMonday"
              />
            </div>

            <div>
              <label htmlFor="saturday">Бямба-Ням </label>
              <input
                className="border-[1px] border-black"
                type="time"
                value={formValues.saturdaySunday}
                onChange={handleInputChange}
                name="saturdaySunday"
              />
              <input
                className="border-[1px] border-black"
                type="time"
                value={formValues.closeSaturdaySunday}
                onChange={handleInputChange}
                name="closeSaturdaySunday"
              />
            </div>
          </div>
        </div>
        <div className="w-[400px] h-[200px] flex flex-col border-black border-[2px] mx-auto mt-[40px] rounded-[10px]  gap-[25px]">
          <h3 className="flex justify-center font-semibold">Coupon</h3>
          <input
            name="discountType"
            type="text"
            id=""
            className="w-[300px] h-[50px] border-[2px] border-black rounded-[10px] placeholder:pl-[10px] placeholder:pt-[10px] focus:pl-[5px] mx-auto "
            placeholder="DiscountType"
            value={formValues.discountType}
            onChange={handleInputChange}
          ></input>
          <input
            name="discountValue"
            type="text"
            className="w-[300px] h-[40px] border-[2px] mx-auto border-black rounded-[10px] placeholder:pl-[10px] focus:pl-[5px]"
            placeholder="DiscountValue"
            value={formValues.discountValue}
            onChange={handleInputChange}
          />
        </div>
        <Link href="service">
          <button className="w-[150px] h-[40px] border-[2px] ml-[198px] mt-[40px] bg-green-600 border-none text-white rounded-[10px]">
            Үйлчилгээ+
          </button>
        </Link>
        <button
          onClick={handleSubmit}
          className=" w-[150px] h-[40px] border-[2px] mx-auto mt-[40px] bg-green-600 border-none text-white rounded-[10px]"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(SpData), { ssr: false });
