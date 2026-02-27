"use client"

import { useState, useContext } from 'react';
import { OrderContext } from "../context";

export default function Sidebar() {
  const orders = useContext(OrderContext);

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Order</h2>
      {orders.length === 0 && (
        <div className="order-empty">
          Add item to start
        </div>
      )}
      {orders.length > 0 && (
        <div className="order-detail">
          <div className="order-items"></div>
          <div className="order-summary"></div>
        </div>
      )}
    </div>
  );
}
