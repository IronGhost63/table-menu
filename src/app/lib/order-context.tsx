import { createContext, useState, useContext, ReactNode } from "react";
import { OrderItem } from "./definitions";

const OrderContext = createContext<any>({});

const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addOrderItem = (menuId: number) => {
    const existingItem = items.find((item: OrderItem) => item.menuId === menuId);

    if ( !existingItem ) {
      setItems([...items, {
        menuId: menuId,
        quantity: 1,
      }]);

      return;
    }

    const updatedItems = items.map((item: OrderItem) => {
      if (item.menuId === menuId) {
        item.quantity = item.quantity + 1;
      }

      return item;
    });

    setItems(updatedItems);
  }

  const removeOrderItem = (menuId: number) => {
    const existingItem = items.find((item: OrderItem) => item.menuId === menuId);

    if ( !existingItem ) {
      return;
    }

    const updatedItem = items.map((item: OrderItem) => {
      if (item.menuId === menuId) {
        item.quantity = item.quantity - 1;
      }

      return item;
    }).filter((item: OrderItem) => item.quantity > 0);

    setItems(updatedItem);
  }

  return (
    <OrderContext.Provider value={{items, addOrderItem, removeOrderItem}}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => {
  return useContext(OrderContext);
};

export { OrderProvider, useOrder };
