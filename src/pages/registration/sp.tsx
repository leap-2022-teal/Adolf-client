import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

export default function SProvider() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const toggleConfirm = () => {
    setOpenConfirm(!openConfirm);
  };
  let spData = {};

  function handleLogin() {
    if (password === cpassword) {
      spData = { phone, email, password };
      axios
        .post(`http://localhost:8000/registration/sp`, spData)
        .then((res) => {
          const { status } = res;
          if (status === 201) {
            alert('Success');
          }
        });
    } else {
      setPasswordError(true);
    }
  }

  useEffect(() => {
    if (password === cpassword) {
      spData = { phone, email, password };
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [cpassword, password]);
  const ErrorClass = 'border-2 border-rose-600 outline-rose-600';
  const normal = 'border-black border-[1px]';
  const passwordErrorMessage = 'Таны оруулсан нууц үг давхцахгүй байна!!';
  return (
    <>
      <div className="w-[400px]">
        <h1 className="flex justify-center">Бүртгүүлэх</h1>
        <div className=" flex justify-around">
          <Link href="/registration/client">Хэрэглэгч</Link>
          <Link className="text-[#f43f5e]" href="">
            Байгууллага
          </Link>
        </div>
      </div>
      <form action="" className="flex flex-col ">
        <div className="w-[400px] flex flex-col gap-[20px] mt-[20px]">
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-[#f1f5f9] h-[40px] rounded-[5px]  placeholder:ps-[10px] border-black border-[1px]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#f1f5f9] h-[40px] rounded-[5px]  placeholder:ps-[10px] border-black border-[1px]"
          />

          <div className="relative ">
            <input
              type={open === false ? 'password' : 'text'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#f1f5f9] h-[40px] rounded-[5px]  w-[400px] placeholder:ps-[10px] border-black border-[1px]"
            />

            <div className="absolute top-3 right-3">
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

          <div className="relative">
            <input
              type={openConfirm === false ? 'password' : 'text'}
              placeholder="Confirm password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              className={`bg-[#f1f5f9] w-[400px] h-[40px] rounded-[5px] placeholder:ps-[10px] ${
                passwordError ? ErrorClass : normal
              } `}
            />
            <div className="absolute top-3 right-3">
              {openConfirm === false ? (
                <AiOutlineEyeInvisible
                  onClick={toggleConfirm}
                  className="w-[20px] h-[20px]"
                />
              ) : (
                <AiOutlineEye
                  onClick={toggleConfirm}
                  className="w-[20px] h-[20px]"
                />
              )}
            </div>
          </div>
          {passwordError && <span> {passwordErrorMessage} </span>}
        </div>
      </form>
      <button
        onClick={handleLogin}
        className="  border-solid border-black border-[1px] w-[100px] h-[40px] rounded-[5px] mt-[10px]  "
      >
        Бүртгүүлэх
      </button>
    </>
  );
}
