import { createContext } from "react";
import { OrderItem, MenuItem } from "./lib/definitions";

export const OrderContext = createContext<OrderItem[]>([]);
export const MenuContext = createContext<MenuItem[]>([]);
