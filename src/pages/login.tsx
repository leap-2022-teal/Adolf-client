import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();

  const toggle = () => {
    setOpen(!open);
  };
  const toggleConfirm = () => {
    setOpenConfirm(!openConfirm);
  };
  function handleLogin() {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/user/login`, {
        phoneNumber,
        password,
      })
      .then((res) => {
        const { data, status } = res;
        console.log(status);
        if (status === 200) {
          const { token, userId } = data;
          localStorage.setItem('loginToken', token);
          // setUserPhoneNumber(userId);
          // window.location.reload();
          // router.push('/');
          alert('Амжилттай нэвтэрлээ');
          router.push('/');
        } else {
          alert(`Error: ${status}`);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data.message);
      });
  }
  // console.log('dugaar', userPhoneNumber);
  return (
    <div className=" w-[400px] bg-white h-[800px] rounded-[20px] shadow-black mx-auto">
      <div className="w-[150px] h-[150px] mx-auto mt-[40px]">
        <img src="/car-wash.png" alt="logo" />
      </div>
      <h1 className="text-black uppercase flex justify-center my-[10px] tracking-[0.5px] text-[20px] font-medium">
        Welcome Back!
      </h1>
      <span className="flex justify-center mt-[-10px] text-slate-500 text-[11px] font-light ">
        Please login to your account.
      </span>
      <div className="flex flex-col gap-[20px] items-center  text-[13px] font-bold text-[#cbd5e1] my-[40px] ">
        <input
          type="text"
          placeholder="Phone number"
          maxLength={8}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className=" placeholder:text-[#cbd5e1] placeholder:font-normal bg-white rounded-[10px] border-[1px] border-[#334155] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none text-black "
        />
        <div className="relative w-[100%] flex justify-center">
          <input
            type={open === false ? 'password' : 'text'}
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className=" placeholder:text-[#cbd5e1] placeholder:font-normal bg-white rounded-[10px] border-[1px] border-[#334155] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none text-black "
          />
          <div className="absolute top-3 right-12">
            {open === false ? (
              <AiOutlineEyeInvisible
                onClick={toggle}
                className="w-[20px] h-[20px]"
              />
            ) : (
              <AiOutlineEye onClick={toggle} className="w-[20px] h-[20px]" />
            )}
          </div>
        </div>
        <a
          href="#"
          className=" text-sky-500 text-[10px] ml-[200px] mt-[-10px]  "
        >
          FORGOT PASSWORD?
        </a>
        <button
          className=" text-white h-[2.5rem] w-[80%] bg-sky-600  rounded-[10px] cursor-pointer "
          onClick={handleLogin}
        >
          Signin
        </button>
      </div>

      <div className="flex gap-[20px] justify-center ">
        <a
          href="/registrationNumber"
          className="my-[10px] text-[13px] tracking-[0.1rem] text-sky-500  mt-[40px]"
        >
          <span className="text-slate-400"> Dont have an account?</span>
          <span> </span>
          Signup
        </a>
      </div>
    </div>
  );
}
