"use client"

import { useState } from "react";
import { MenuProvider } from "./lib/menu-context";
import { OrderProvider } from "./lib/order-context";
import { PromotionProvider } from "./lib/promotion-context";
import MenuList from "./components/menu-list";
import Sidebar from "./components/sidebar";

export default function Home() {
  const [currentTab, setCurrentTab] = useState('menu');

  const handleTabToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setCurrentTab(e.currentTarget.value);
  }
  return (
    <MenuProvider>
      <OrderProvider>
        <PromotionProvider>
          <main className="main-container">
            <ul className="tab-bar">
              <li className="tab">
                <button className={`tab-toggle ${currentTab === 'menu' ? 'active' : ''}`} value="menu" onClick={handleTabToggle}>Menu</button>
              </li>
              <li className="tab">
                <button className={`tab-toggle ${currentTab === 'order' ? 'active' : ''}`} value="order" onClick={handleTabToggle}>Order</button>
              </li>
            </ul>
            <div className={`content-area ${currentTab === 'menu' ? 'active' : ''}`}>
              <MenuList />
            </div>
            <div className={`sidebar ${currentTab === 'order' ? 'active' : ''}`}>
              <Sidebar />
            </div>
          </main>
        </PromotionProvider>
      </OrderProvider>
    </MenuProvider>
  );
}
