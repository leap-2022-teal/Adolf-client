import { MainLayout } from '@/components/MainLayout';
import { UserContext, UserProvider } from '@/context/userProvider';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';

export default function UserProfile() {
  const router = useRouter();
  const user = useContext<any>(UserContext);
  console.log(user, 'ploop');
  const [profilePicture, setProfilepicture] = useState('/blank-profile.png');
  const [firstName, setUpdatedFName] = useState<any>(
    user?.firstName || undefined
  );
  const [lastName, setUpdatedLName] = useState<any>(
    user?.firstName || undefined
  );
  const [email, setUpdatedEmail] = useState<any>(user?.email || undefined);
  const [phoneNumber, setUpdatedPhNumber] = useState<any>(
    user?.phoneNumber || undefined
  );
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<any>('');
  const editedUserInfo = {
    firstName,
    lastName,
    email,
    phoneNumber,
    image,
  };
  console.log(editedUserInfo);
  function handleUpdate({ e, id }: any) {
    e.preventDefault();
    axios
      .put(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/user/${id}`,
        editedUserInfo
      )
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          alert(' Amjilttai');
          router.push('/');
        }
      });
  }
  async function handleFileUpload(event: any) {
    const imageFile = event.target.files[0];
    console.log(imageFile, 'asdasdasdasdsdjhvdsuhvh');
    const formData = new FormData();
    formData.append('image', imageFile);
    console.log(formData);
    await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/upload-image`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      });
  }
  console.log(image, 'swwwwqwdq');

  if (!user && user === null) {
    router.replace('/login');
  }
  return (
    <>
      <UserProvider>
        <MainLayout>
          <div className="w-[400px] h-screen mx-auto mt-10">
            <form action="" className="flex flex-col gap-4 w-[100%]">
              <div className="max-w-[500px]  h-[200px] rounded-t-2xl border-2">
                <div className="relative w-[110px] h-[110px] rounded-full border-2 border-white mx-auto mt-4 ">
                  <img
                    src={user?.image}
                    className="w-[107px] h-[106px] rounded-full"
                    alt=""
                  />
                  <label className="w-9 h-9 flex flex-col items-center  bg-white text-blue rounded-full shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white absolute top-[65px] left-[75px]">
                    <input
                      type="file"
                      className="hidden"
                      name="image"
                      onChange={handleFileUpload}
                    />
                    <AiFillCamera className="w-5 h-5 text-blue-500 mt-[7px]" />
                  </label>
                </div>

                <h2 className="text-black font-semibold text-lg h-6 mt-4 flex gap-2 justify-center ">
                  <span>{user?.firstName}</span> <span>{user?.lastName}</span>
                </h2>
              </div>

              <input
                defaultValue={user?.firstName}
                // value={updatedFName}
                onChange={(e) => setUpdatedFName(e.target.value)}
                type="text"
                className="bg-white rounded-lg border-[1px] border-[#334155] h-[2.5rem] w-[100%] outline-[none] px-[10px] focus:outline-none text-black "
              />

              <input
                defaultValue={user?.lastName}
                // value={updatedLName}
                onChange={(e) => setUpdatedLName(e.target.value)}
                type="text"
                className="bg-white rounded-lg border-[1px] border-[#334155] h-[2.5rem] w-[100%] outline-[none] px-[10px] focus:outline-none text-black"
              />

              <input
                defaultValue={user?.email}
                // value={updatedLName}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                type="text"
                className="bg-white rounded-lg border-[1px] border-[#334155] h-[2.5rem] w-[100%] outline-[none] px-[10px] focus:outline-none text-black"
              />
              <input
                defaultValue={user?.phoneNumber}
                // value={updatedLName}
                onChange={(e) => setUpdatedPhNumber(e.target.value)}
                // value={user?.phoneNumber}
                type="text"
                className="bg-white rounded-lg border-[1px] border-[#334155] h-[2.5rem] w-[100%] outline-[none] px-[10px] focus:outline-none text-black"
              />
              <input
                type="submit"
                onClick={(e) => handleUpdate({ e, id: user._id })}
                value={'Хадгалах'}
                className=" text-white h-[2.5rem] w-[100%] bg-blue-600 text:flex rounded-[10px] cursor-pointer  mt-[100px] "
              />
            </form>
            <Link href={`/`} className="mx-auto">
              <AiOutlineHome className="w-[30px] h-[30px] " type="button" />
            </Link>
          </div>
        </MainLayout>
      </UserProvider>
    </>
  );
}
