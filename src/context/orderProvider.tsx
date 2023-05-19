import { createContext, useState } from 'react';

export const OrderContext = createContext<any>(undefined);
export function OrderProvider({ children }: any) {
  const [serviceOrder, setServiceOrder] = useState<any>([]);
  const [SPinfo, setSPinfo] = useState<any>([]);
  function addToOrder(selectedServiceInfo: any) {
    setServiceOrder(selectedServiceInfo);
  }
  const [UserselectedDate, setSelectedDate] = useState<any>(undefined);
  function setUserSelectedDate(date: any) {
    setSelectedDate(date);
  }
  console.log(UserselectedDate, 'user date');
  return (
    <OrderContext.Provider
      value={{ addToOrder, setSPinfo, setUserSelectedDate, SPinfo }}
    >
      {children}
    </OrderContext.Provider>
  );
}
