"use client"

import { useContext } from "react";
import { MenuContext } from "../context";

export default function MenuList() {
  const menuItems = useContext(MenuContext);

  return (
    <div className="menu-selection">
      <h2 className="title">Menu</h2>
      <div className="menu-list">
        {menuItems.map(item => (
        <div className='menu-item' style={{ backgroundColor: `var(--color-${item.color})` }} key={JSON.stringify(item)}>
          <p className="item-name">{item.name}</p>
          <p className="item-price">{item.price} THB</p>
        </div>
        ))}
      </div>
    </div>
  );
}
