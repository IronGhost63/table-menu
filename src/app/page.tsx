"use client"

import { MenuContext, OrderContext } from "./context";
import MenuList from "./components/menu-list";
import Sidebar from "./components/sidebar";
import menuItems from "../data/menu.json";

export default function Home() {
  return (
    <MenuContext.Provider value={menuItems}>
      <OrderContext.Provider value={[]}>
        <main className="main-container">
          <div className="content-area">
            <MenuList />
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
        </main>
      </OrderContext.Provider>
    </MenuContext.Provider>
  );
}
