import { createContext, useState, useContext, ReactNode } from "react";
import { OrderItem } from "./definitions";

const OrderContext = createContext<any>({});

const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<OrderItem[]>([]);

  const updateOrderItem = (item: OrderItem) => {
    console.log(item);
  };

  return (
    <OrderContext.Provider value={{items, updateOrderItem}}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => {
  return useContext(OrderContext);
};

export { OrderProvider, useOrder };
