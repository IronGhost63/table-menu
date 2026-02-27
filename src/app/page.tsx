"use client"

import { MenuProvider } from "./lib/menu-context";
import { OrderProvider } from "./lib/order-context";
import MenuList from "./components/menu-list";
import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <MenuProvider>
      <OrderProvider>
        <main className="main-container">
          <div className="content-area">
            <MenuList />
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
        </main>
      </OrderProvider>
    </MenuProvider>
  );
}
