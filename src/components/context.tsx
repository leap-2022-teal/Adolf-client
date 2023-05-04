import { createContext, useState, ReactNode } from 'react';

export const UserProfileContext = createContext<any>(undefined);

export const UserProfile = ({ children }: any) => {
  const initialState = {
    userNumber: '',
  };
  const [userName, setUserName] = useState<any>();
  const [userPhoneNumber, setUserPhoneNumber] = useState<any>('78698');
  {
    console.log('function', userPhoneNumber);
  }

  return (
    <UserProfileContext.Provider
      value={{ userName, userPhoneNumber, setUserPhoneNumber, setUserName }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
