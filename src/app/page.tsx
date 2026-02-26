import { useState } from "react";
import MenuList from "./components/menu-list";
import Sidebar from "./components/sidebar";

export default function Home() {
  const [orderItems, setOrderItems] = useState([]);

  return (
    <main className="main-container">
      <div className="content-area">
        <MenuList />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
    </main>
  );
}
