import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Image from 'next/image';

function SpData() {
  const [name, setName] = useState<string>('');
  const [discountType, setDiscountType] = useState<string>('');
  const [discountValue, setDiscountValue] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [lat, setLat] = useState<string>();
  const [long, setLong] = useState<string>();
  const [mondayFriday, setMondayFriday] = useState<string>('');
  const [saturdaySunday, setSaturdaySunday] = useState<string>('');
  const [closeMonday, setCloseMonday] = useState<string>('');
  const [closeSaturdaySunday, setCloseSaturdaySunday] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<any>('');
  const [district, setDistrict] = useState<string>('');
  // console.log('eneshu', District);
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
        setUploading(false);
      });
  }
  let spData = {};
  function handleSpData() {
    spData = {
      name,
      discountType,
      discountValue,
      description,
      address,
      lat,
      long,
      mondayFriday,
      saturdaySunday,
      closeMonday,
      closeSaturdaySunday,
      image,
      district,
    };
    axios.post(`http://localhost:8000/spData`, spData).then((res) => {
      const { status } = res;
      if (status === 201) {
        alert('Success');
      }
    });
  }

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
        <div className="flex flex-col items-center gap-[40px] ">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Байгууллагын нэр"
            className="w-[400px] h-[40px]  border-[2px] rounded-[10px]  placeholder:pl-[10px] border-black mt-[40px] focus:pl-[10px] "
          />
          <div className="flex flex-col gap-[10px]">
            <select
              name="District"
              id=""
              onChange={(e) => setDistrict(e.target.value)}
              className="w-[400px] h-[40px] rounded-[10px] border-[2px] border-black  "
            >
              <option selected>Бүх байршил</option>
              <option value="1">УБ-Багануур</option>
              <option value="2">УБ-Багахангай</option>
              <option value="3">УБ-Баянгол</option>
              <option value="4">УБ-Баянзүрх</option>
              <option value="5">УБ-Налайх</option>
              <option value="6">УБ-Сонгинохайрхан</option>
              <option value="7">УБ-Сүхбаатар</option>
              <option value="8">УБ-Хан-Уул</option>
              <option value="9">УБ-Чингэлтэй</option>
              <option value="10">Дархан</option>
              <option value="11">Эрдэнэт</option>
            </select>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="bairshil nemelt medeelel"
              className="border-[2px] border-black w-[400px] rounded-[10px]"
            ></textarea>
            <div className="flex gap-[38px]">
              <input
                type="text"
                placeholder="Lat"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="border-[2px] border-black h-[40px] rounded-[10px]"
              />
              <input
                type="text"
                placeholder="Long"
                value={long}
                onChange={(e) => setLong(e.target.value)}
                className="border-[2px] border-black h-[40px] rounded-[10px]"
              />
            </div>
          </div>
        </div>
        {/* <input
          type="file"
          className=" file:bg-green-600  ml-[120px] file:border-none file:h-[40px] file:w-[100px] file:text-white file:rounded-[20px] mt-[10px]"
        />
        {/* <div>
          <CKEditor
            editor={ClassicEditor}
            // data={discription}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDiscription(data);
            }}
          />
        </div> */}
        <div>
          <textarea
            className=" file:bg-green-600  ml-[120px] file:border-none file:h-[40px] file:w-[100px] file:text-white file:rounded-[20px] mt-[10px] min-w-[400px] h-[200px] border-4 border-black-400 border-solid"
            value={description}
            placeholder="tailbar"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div>
          <div className="flex flex-col items-center ">
            <div>
              <label htmlFor="monday">Даваа-Баасан </label>

              <input
                className="border-[1px] border-black"
                type="time"
                value={mondayFriday}
                onChange={(e) => setMondayFriday(e.target.value)}
                name="monday"
              />
              <input
                className="border-[1px] border-black"
                type="time"
                value={closeMonday}
                onChange={(e) => setCloseMonday(e.target.value)}
                name="monday"
              />
            </div>

            <div>
              <label htmlFor="saturday">Бямба-Ням </label>
              <input
                className="border-[1px] border-black"
                type="time"
                value={saturdaySunday}
                onChange={(e) => setSaturdaySunday(e.target.value)}
                name="saturday"
              />
              <input
                className="border-[1px] border-black"
                type="time"
                value={closeSaturdaySunday}
                onChange={(e) => setCloseSaturdaySunday(e.target.value)}
                name="saturday"
              />
            </div>
          </div>
        </div>
        <div className="w-[400px] h-[200px] flex flex-col border-black border-[2px] mx-auto mt-[40px] rounded-[10px]  gap-[25px]">
          <h3 className="flex justify-center font-semibold">Coupon</h3>
          <textarea
            name=""
            id=""
            className="w-[300px] h-[50px] border-[2px] border-black rounded-[10px] placeholder:pl-[10px] placeholder:pt-[10px] focus:pl-[5px] mx-auto "
            placeholder="DiscountType"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          ></textarea>
          <input
            type="text"
            className="w-[300px] h-[40px] border-[2px] mx-auto border-black rounded-[10px] placeholder:pl-[10px] focus:pl-[5px]"
            placeholder="DiscountValue"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
          />
        </div>
        <Link href="service">
          <button className="w-[150px] h-[40px] border-[2px] ml-[198px] mt-[40px] bg-green-600 border-none text-white rounded-[10px]">
            Үйлчилгээ+
          </button>
        </Link>
        <button
          onClick={handleSpData}
          className=" w-[150px] h-[40px] border-[2px] mx-auto mt-[40px] bg-green-600 border-none text-white rounded-[10px]"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(SpData), { ssr: false });
