import { createContext, useState } from 'react';

export const OrderContext = createContext<any>(undefined);
export function OrderProvider({ children }: any) {
  // const [order, setOrder] = useState<any>(undefined);
  const [serviceOrder, setServiceOrder] = useState<any>([]);
  const [SPinfo, setSPinfo] = useState<any>([]);
  console.log('selectedService', serviceOrder);
  console.log('spInfoshd', SPinfo);
  function addToOrder(selectedServiceInfo: any) {
    setServiceOrder(selectedServiceInfo);
  }
  const [UserselectedDate, setSelectedDate] = useState<any>(undefined);
  // console.log('ppppeee', UserselectedDate);
  function setUserSelectedDate(date: any) {
    setSelectedDate(date);
    // console.log(date);
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
