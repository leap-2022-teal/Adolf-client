import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { textSpanContainsPosition } from 'typescript';
export default function RequestDeatails() {
  const [sP, setSp] = useState<any>([]);
  const [service, setService] = useState<any>([]);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  // const query = router.query
  // console.log(param);
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/sample/${id}`).then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setSp(data);
        } else {
          alert('aldaa garlaa');
        }
      });
    }
  }, [id]);
  useEffect(() => {
    axios.get(`http://localhost:8000/request`).then((res) => {
      setService(res.data);
      console.log(res.data);
    });
  }, []);
  if (!sP) return <div>Loading...</div>;
  return (
    <>
      <div className="w-[400px] mx-auto h-screen ">
        <h1>Request details</h1>

        <div>
          <h1>{sP.name}</h1>
        </div>

        <div className="w-[100%] h-[200px]">
          <div className="w-[150px] h-[100%] rounded  border-2 border-black bg-gray-100 hover:bg-blue-500 hover:text-white flex flex-col items-center  ">
            <img src="/sedan.png" className="w-[100px] h-[100px]  " alt="" />
            <h5>Sedan</h5>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
