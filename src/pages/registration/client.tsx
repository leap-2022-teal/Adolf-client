import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Client(){
      const [email , setEmail] = useState("")
    const [phone , setPhone] = useState("")
    const [ password , setPassword] = useState("")
    const [ cpassword , setCpassword] = useState("")
    const [ passwordError , setPasswordError] = useState(false)
    const [ userInputData , setUserInputData] = useState({})
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
            
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#f1f5f9] h-[40px] rounded-[5px]  placeholder:ps-[10px] border-black border-[1px]" />
                
                
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