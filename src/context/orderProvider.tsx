import { createContext, useState } from 'react';

export const OrderContext = createContext<any>(undefined);
export function OrderProvider({ children }: any) {
  const [order, setOrder] = useState<any>(undefined);
  console.log('orderid', order);
  function addToOrder(id: any) {
    setOrder(id);
  }

  return (
    <OrderContext.Provider value={{ addToOrder, order }}>
      {children}
    </OrderContext.Provider>
  );
}
