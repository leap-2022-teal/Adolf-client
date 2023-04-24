import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Image from 'next/image';

function SpData() {
  const [name, setName] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [discription, setDiscription] = useState('');
  const [building, setBuilding] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [mondayFriday, setMondayFriday] = useState('');
  const [saturdaySunday, setSaturdaySunday] = useState('');
  const [closeMonday, setCloseMonday] = useState('');
  const [closeSaturdaySunday, setCloseSaturdaySunday] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [uploading, setUplouding] = useState(false);
  // async function handleFileUploud(event: any) {
  //   const imageFile = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append('profilePicture', imageFile);
  //   await fetch(`${process.env.REACT_APP_API_URL}/upload-image`, {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProfilePicture(data);
  //       // setUplouding(false);
  //     });
  // }
  // console.log(profilePicture);
  return (
    <>
      <div className="flex flex-col w-[800px] h-[100%] border-[3px] border-green-600 sm-[400px]">
        <div className="flex items-center mt-4 flex-col mx-auto">
          <h1 className=" font-semibold">ProfilePicture</h1>
          <input
            type="file"
            value={profilePicture}
            name="profilePicture"
            // onChange={handleFileUploud}
            className=" file:bg-green-600  ml-[120px] file:border-none file:h-[40px] file:w-[100px] file:text-white file:rounded-[20px] mt-[10px]"
          />
          {/* {uploading && (
            <div className="border-4 border-red-600" role="status"></div>
          )}

          {profilePicture && (
            <img src={profilePicture.path} width="100" alt="" />
          )} */}
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
              className="w-[400px] h-[40px] rounded-[10px] border-[2px] border-black  "
            >
              <option value="">Бүх байршил</option>
              <option value="">УБ-Багануур</option>
              <option value="">УБ-Багахангай</option>
              <option value="">УБ-Баянгол</option>
              <option value="">УБ-Баянзүрх</option>
              <option value="">УБ-Налайх</option>
              <option value="">УБ-Сонгинохайрхан</option>
              <option value="">УБ-Сүхбаатар</option>
              <option value="">УБ-Хан-Уул</option>
              <option value="">УБ-Чингэлтэй</option>
              <option value="">Дархан</option>
              <option value="">Эрдэнэт</option>
            </select>
            <textarea
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
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
        <input
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
            value={discription}
            placeholder="tailbar"
            onChange={(event) => {
              setDiscription(event.target.value);
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
        <button className=" w-[150px] h-[40px] border-[2px] mx-auto mt-[40px] bg-green-600 border-none text-white rounded-[10px]">
          Submit
        </button>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(SpData), { ssr: false });
