import axios from "axios";
import Link from "next/link";
import test from "node:test";
import { useEffect, useState } from "react";

export default function Client(){
      const [email , setEmail] = useState("")
    const [phone , setPhone] = useState("")
    const [ password , setPassword] = useState("")
    const [ cpassword , setCpassword] = useState("")
    const [ passwordError , setPasswordError] = useState(false)
    const [ userInputData , setUserInputData] = useState({})
    const [open , setOpen] = useState (false)
    const toggle =() =>{
        setOpen(!open)
    }
    let userData = {}
   
  
    console.log(userInputData)
        function handleLogin(){
            if(password === cpassword){
                userData = {email, phone, password}
                axios.post(`http://localhost:9000/registration/client` , {
                    userData
                })
                .then((res) =>{
                    const {data , status} =res;
                })
                .catch(({response , code}) => {
                    const {data} = response;
                    alert(data.message)
                });
            }else{
                setPasswordError(true)
            }
    }

    useEffect(()=>{
        if(password === cpassword){
            userData = {email, phone, password}
            setPasswordError(false)
        }else{
            setPasswordError(true)
        }

    },[cpassword, password])
     const ErrorClass = "border-2 border-rose-600 outline-rose-600"
     const normal = "border-black border-[1px]" 
    const passwordErrorMessage = "Таны оруулсан нууц үг давхцахгүй байна!!"
    return (
        <>
        
        <div className="form">
                                <div className="w-[400px]">
                                    <h1 className="flex justify-center">Бүртгүүлэх</h1>
                                <div className=" flex justify-around">
                  <Link className="text-[#f43f5e]" href="">Хэрэглэгч</Link>
                 <Link href="/registration/sp">Байгууллага</Link>
            </div>
            </div>
            <form action="" className="flex flex-col ">
               <div className="w-[400px] flex flex-col gap-[20px] mt-[20px]">
               <input type="text" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-[#f1f5f9] h-[40px] rounded-[5px]  placeholder:ps-[10px] border-black border-[1px]" />
                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  className="bg-[#f1f5f9] h-[40px] rounded-[5px]  placeholder:ps-[10px] border-black border-[1px]"/>
            
               <div className="relative ">
               <input type={(open === false) ? 'password' : "text"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#f1f5f9] h-[40px] rounded-[5px]  w-[400px] placeholder:ps-[10px] border-black border-[1px]" />
                <div className="absolute top-2 right-3" >
                   {
                        (open === false) ? 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6" onClick={toggle}> 
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg> :   
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6" onClick={toggle}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>

                   }
               
             
              
                </div>

               </div>

                
                
                <input type="password" placeholder="Confirm password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} className = {`bg-[#f1f5f9] h-[40px] rounded-[5px] placeholder:ps-[10px] ${ passwordError ? ErrorClass: normal} `}/>
          {  passwordError && (
              <span>  {passwordErrorMessage} </span>
          )
                    }
               </div>
            </form>
            <button onClick={handleLogin} className="  border-solid border-black border-[1px] w-[100px] h-[40px] rounded-[5px] mt-[10px]  ">Бүртгүүлэх</button>
        </div>
        </>
    )
}