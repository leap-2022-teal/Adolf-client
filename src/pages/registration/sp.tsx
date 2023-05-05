import axios from 'axios';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import AppContext from '@/components/AppContext';
interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
export default function SProvider() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const [cpassword, setCpassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [emailError, setemailError] = useState(false);
  const context = useContext<any>(AppContext);
  const phoneNumber = context.phone;
  const password = formValues.password;
  function handleInputChange(evt: any) {
    const value = evt.target.value;
    // console.log(evt.target.name);
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
  }
  const toggle = () => {
    setOpen(!open);
  };

  const toggleConfirm = () => {
    setOpenConfirm(!openConfirm);
  };
  let userInput = {};
  // console.log(formValues.email);
  console.log(
    formValues.email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  );
  const handleValidation = (event: any) => {
    let formIsValid = true;
    if (
      !formValues.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      formIsValid = false;
      setemailError(true);
      return false;
    } else {
      setemailError(false);
      formIsValid = true;
    }
  };

  async function handleLogin(e: any) {
    e.preventDefault();
    handleValidation(e);
    if (password.length > 0) {
      if (password === cpassword) {
        userInput = { ...formValues, phoneNumber };
        await axios
          .post(`http://localhost:8000/registration/client`, userInput)
          .then((res) => {
            const { status, data } = res;
            console.log(status);
            if (status === 201) {
              alert('Амжилттай бүргэгдлээ');
            }
          })
          .catch((err) => {
            // else if (res.status === 400) {

            console.log('ene', err.message);
            alert(`${err.response.data.message}`);
            // }
          });
        console.log(userInput);
      } else {
        setPasswordError(true);
      }
    }
  }

  useEffect(() => {
    if (password === cpassword) {
      userInput = { ...formValues, phoneNumber };
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [cpassword, formValues.password]);
  const ErrorClass = 'border-2 border-rose-600 ';
  const normal = 'border-black border-[1px] ';
  const passwordErrorMessage = 'Таны оруулсан нууц үг давхцахгүй байна!!';
  if (typeof window === 'undefined') return null;
  return (
    <>
      <div className="w-[400px] bg-white h-[800px] rounded-[20px] shadow-black flex items-center flex-col mx-auto">
        <h1 className="text-black  flex justify-center my-[10px] tracking-[0.5px] text-[22px] font-medium mt-[20px]">
          Fill out this form
        </h1>
        <span className="flex justify-center mt-[-10px] text-slate-500 text-[11px] font-light ">
          Please complete your information.
        </span>
        <input
          name="firstName"
          type="text"
          className=" placeholder:text-[#cbd5e1] placeholder:font-normal bg-white rounded-[10px] border-[1px] border-[#334155] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none text-black mt-[30px]  "
          placeholder="First Name"
          value={formValues.firstName}
          onChange={handleInputChange}
        />
        <input
          name="lastName"
          type="text"
          className=" placeholder:text-[#cbd5e1] placeholder:font-normal bg-white rounded-[10px] border-[1px] border-[#334155] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none text-black mt-[20px]  "
          placeholder="Last Name"
          value={formValues.lastName}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
          className=" placeholder:text-[#cbd5e1] placeholder:font-normal bg-white rounded-[10px] border-[1px] border-[#334155] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none text-black mt-[20px]  "
        />
        <small id="emailHelp" className="text-danger form-text">
          {emailError && 'Email хаяг @ агуулсан байх ёстой'}
        </small>

        <div className="relative w-[100%] flex justify-center ">
          <input
            type={open === false ? 'password' : 'text'}
            placeholder="Password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            className=" placeholder:text-[#cbd5e1] placeholder:font-normal bg-white rounded-[10px] border-[1px] border-[#334155] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none text-black mt-[20px] "
          />

          <div className="absolute top-8 right-12">
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

        <div className="relative w-[100%] flex justify-center">
          <input
            type={openConfirm === false ? 'password' : 'text'}
            placeholder="Confirm password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            className={`placeholder:text-[#cbd5e1] placeholder:font-normal bg-white rounded-[10px] border-[1px] border-[#334155] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none text-black mt-[20px]  ${
              passwordError ? ErrorClass : normal
            } `}
          />
          <div className="absolute top-8 right-12">
            {openConfirm === false ? (
              <AiOutlineEyeInvisible
                onClick={toggleConfirm}
                className="w-[20px] h-[20px] text-inherit"
              />
            ) : (
              <AiOutlineEye
                onClick={toggleConfirm}
                className="w-[20px] h-[20px] "
              />
            )}
          </div>
        </div>
        <div className="flex mt-[20px] gap-1 ml-[-40px]">
          <input type="checkbox" id="checkbox" />
          <label
            htmlFor="checkbox"
            className="flex justify-center mt-[-10px] text-slate-500 text-[11px] font-light pt-[9px]"
          >
            By creating an account, you agree to our
            <span className="text-sky-600 font-normal px-1"> Terms</span>
          </label>
        </div>
        <Link
          href="/login/login"
          onClick={handleLogin}
          className=" text-white h-[2.5rem] w-[80%] bg-sky-600 text:flex rounded-[10px] cursor-pointer  mt-[30px]"
        >
          <span className="flex justify-center pt-[6px]"> Бүртгүүлэх</span>
        </Link>
        {passwordError && <span> {passwordErrorMessage} </span>}
      </div>
    </>
  );
}
