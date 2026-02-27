import { createContext, useContext, ReactNode } from "react";
import { MenuItem } from "./definitions";
import menuItems from "../../data/menu.json";

export const MenuContext = createContext<MenuItem[]>([]);

const MenuProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MenuContext.Provider value={menuItems}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => {
  return useContext(MenuContext);
};

export { MenuProvider, useMenu };
