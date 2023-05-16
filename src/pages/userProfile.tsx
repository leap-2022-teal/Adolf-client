import { useState } from 'react';

export default function UserProfile() {
  return (
    <>
      <div>
        <form action="" className="flex flex-col gap-4">
          <input type="file" />

          <div>
            <label htmlFor="firstName">First Name :</label>
            <input
              type="text"
              id="firstName"
              className="border-2 border-black"
            />
          </div>
          <div>
            <label htmlFor="LastName">Last Name :</label>
            <input
              type="text"
              id="LastName"
              className="border-2 border-black"
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number :</label>
            <input type="text" id="phone" className="border-2 border-black" />
          </div>
        </form>
      </div>
    </>
  );
}
