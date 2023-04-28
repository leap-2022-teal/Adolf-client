import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  function handleLogin() {
    axios
      .post('http://localhost:8000/registration/login', {
        phoneNumber,
        password,
      })
      .then((res) => {
        const { data, status } = res;
        console.log(status);
        if (status === 200) {
          const { token } = data;
          localStorage.setItem('loginToken', token);
          window.location.reload();
          alert('Амжилттай нэвтэрлээ');
        } else {
          alert(`Error: ${status}`);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data.message);
      });
  }

  return (
    <div
      className=" bg-[#1f2937]
          flex  flex-col items-center "
    >
      <div className="w-[400px] bg-black bg-opacity-10 h-[50vh] rounded-[20px] shadow-black">
        <h1 className="text-white uppercase flex justify-center my-[10px] tracking-[0.4rem] text-[26px]">
          Welcome
        </h1>
        <div className="flex flex-col gap-[30px] items-center  text-[13px] font-bold text-[#cbd5e1] my-[40px] ">
          <input
            type="text"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className=" placeholder:text-[#cbd5e1] bg-neutral-400 bg-opacity-20 rounded-[2rem] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none "
          />
          <input
            type="Password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="placeholder:text-[#cbd5e1] bg-neutral-400 bg-opacity-20 rounded-[2rem] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none"
          />
        </div>
        <div className="flex gap-[20px] justify-center ">
          <button
            className="w-[50%] text-[#cbd5e1] h-[2.5rem] bg-neutral-400 bg-opacity-10 rounded-[2rem] cursor-pointer ml-[-40px] "
            onClick={handleLogin}
          >
            Signin
          </button>
          <a
            href="/registration/client"
            className="my-[10px] text-[13px] tracking-[0.1rem] text-white "
          >
            Signup
          </a>
        </div>
        <a
          href="#"
          className="tracking-[0.3rem] text-white text-[10px] flex justify-center my-[20px]"
        >
          FORGOT PASSWORD?
        </a>
      </div>
    </div>
  );
}
