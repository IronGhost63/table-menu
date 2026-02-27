"use client"

import { MenuProvider } from "./lib/menu-context";
import { OrderProvider } from "./lib/order-context";
import { PromotionProvider } from "./lib/promotion-context";
import MenuList from "./components/menu-list";
import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <MenuProvider>
      <OrderProvider>
        <PromotionProvider>
          <main className="main-container">
            <div className="content-area">
              <MenuList />
            </div>
            <div className="sidebar">
              <Sidebar />
            </div>
          </main>
        </PromotionProvider>
      </OrderProvider>
    </MenuProvider>
  );
}
