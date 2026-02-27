"use client"

import { useOrder } from "../lib/order-context";
import { OrderItem } from "../lib/definitions";
import OrderMenuItem from "./order-menu-item";
import OrderSummary from "../components/order-summary";

export default function Sidebar() {
  const orders = useOrder();

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Order</h2>
      {orders.items.length === 0 && (
        <div className="order-empty">
          Add item to start
        </div>
      )}
      {orders.items.length > 0 && (
        <div className="order-detail">
          <ul className="order-items">
            {orders.items.map((item: OrderItem) => (
              <OrderMenuItem item={item}/>
            ))}
          </ul>
          <OrderSummary />
        </div>
      )}
    </div>
  );
}
