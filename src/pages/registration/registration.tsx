export default function Registration(){
    return(
        <div className=" bg-[#1f2937]
          flex  flex-col items-center ">
            <div className="w-[400px] bg-black bg-opacity-10 h-[50vh] rounded-[20px] shadow-black">
                <h1 className="text-white uppercase flex justify-center my-[10px] tracking-[0.4rem] text-[26px]" >SIGN UP</h1>
                <div className="flex flex-col gap-[30px] items-center  text-[13px] font-bold text-[#cbd5e1] my-[40px] ">
                    <input type="Email" placeholder="Email" className=" placeholder:text-[#cbd5e1] bg-neutral-400 bg-opacity-20 rounded-[2rem] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none "/>
                    <input type="Password" placeholder="Password" className="placeholder:text-[#cbd5e1] bg-neutral-400 bg-opacity-20 rounded-[2rem] h-[2.5rem] w-[80%] outline-[none] px-[10px] focus:outline-none" />
                     <button className="w-[50%] text-[#cbd5e1] h-[2.5rem] bg-neutral-400 bg-opacity-10 rounded-[2rem] cursor-pointer  ">Sign Up</button>
                    
                </div>
                <h4 className="tracking-[0.2rem] mt-[-5px] text-white text-[15px] flex justify-center ">OR SIGN UP</h4>
               <hr className="w-[90%] border-none h-[0.2rem] bg-white rounded-[0.8rem] backdrop-blur-[25px] bg-gradient-to-r from-[#334155]  to-[#1e293b] bg-opacity-30 mx-auto mt-[20px]" />
                <div className="flex gap-4 justify-center mt-7">
                    <img src="/google.png" alt="google" width="30px"/>
                    <img src="/facebook.png" alt="" width="30px" />
                </div>
                
                      
                   
                    
            </div>
        </div>
    )
}