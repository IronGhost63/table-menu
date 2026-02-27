"use client"

import { useMenu } from "../lib/menu-context";
import { useOrder } from "../lib/order-context";
import { MenuItem, OrderItem } from "../lib/definitions";

export default function MenuList() {
  const menuItems = useMenu();
  const orders = useOrder();

  const handleAddMenu = (item: MenuItem) => {
    orders.addOrderItem(item.id)
  }

  return (
    <div className="menu-selection">
      <h2 className="title">Menu</h2>
      <div className="menu-list">
        {menuItems.map(item => (
        <div className='menu-item' style={{ backgroundColor: `var(--color-${item.color})` }} key={JSON.stringify(item)} onClick={() => handleAddMenu(item)}>
          <p className="item-name">{item.name}</p>
          <p className="item-price">{item.price} THB</p>
        </div>
        ))}
      </div>
    </div>
  );
}
