"use client"

import { useState, useContext } from 'react';
import { useOrder } from "../lib/order-context";

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
          <div className="order-items"></div>
          <div className="order-summary"></div>
        </div>
      )}
    </div>
  );
}
