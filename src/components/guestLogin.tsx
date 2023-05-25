import axios from 'axios';

export default function GuestLogin() {
  async function handleRegister(e: any) {
    e.preventDefault();
    const userInput = {
      phoneNumber: Math.floor(Math.random() * 100000000),
      password: '1',
    };
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/user/registration`,
        userInput
      )
      .then((res) => {
        console.log(res);
        const { status, data } = res;
        console.log(status);
        if (status === 201 || status === 200) {
          axios
            .post(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/user/login`, {
              phoneNumber: userInput.phoneNumber,
              password: userInput.password,
            })
            .then((res) => {
              const { data, status } = res;
              console.log(status);
              if (status === 201 || status === 200) {
                const { token, userId } = data;
                localStorage.setItem('loginToken', token);
                alert('Амжилттай нэвтэрлээ');
                window.location.reload();
              } else {
                alert(`Error: ${status}`);
              }
            })
            .catch((err) => {
              console.log(err);
              alert(err.response?.data.message);
            });
        }
      })
      .catch((err) => {
        // else if (res.status === 400) {

        console.log('ene', err.message);
        alert(`${err.response.data.message}`);
        // }
      });
    console.log(userInput);
  }

  return (
    <button
      className="text-white h-[2.5rem] w-[80%] bg-blue-600  rounded-[10px] cursor-pointer"
      onClick={handleRegister}
    >
      Зочиноор нэвтрэх
    </button>
  );
}
