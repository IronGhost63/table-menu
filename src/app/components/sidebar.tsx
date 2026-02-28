"use client"

import { useState } from "react";
import { BsReceipt, BsXCircle  } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useOrder } from "../lib/order-context";
import { useMenu } from "../lib/menu-context";
import { MenuItem, OrderItem } from "../lib/definitions";
import Link from "next/link";
import OrderMenuItem from "./order-menu-item";
import OrderSummary from "../components/order-summary";
import Modal from "../components/modal";

export default function Sidebar() {
  const defaultModal = <div className="modal-loading-content"><CgSpinner className="spinner"/></div>;
  const orders = useOrder();
  const menu = useMenu();
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(defaultModal);
  const [modalHideControl, setModalHideControl] = useState(false);

  const handleCreateOrder = async () => {
    setConfirmModal(false);

    const orderItems = orders.items.map((orderItem: OrderItem) => {
      const menuItem = menu.find((item: MenuItem) => orderItem.menuId === item.id);

      if (!menuItem) {
        return false;
      }

      return {
        name: menuItem.name,
        quantity: orderItem.quantity,
        unitPrice: menuItem.price
      }
    });

    console.log( orderItems );

    const receiptPayload = {
      items: orderItems,
      summary: {
        subtotal: 0,
        discount: 0,
        total: 0,
      }
    }

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify(receiptPayload),
      });

      const payload = await response.json();

      setModalMessage(
        <div className="save-success">
          <p>Order is created</p>
          <p>
            <Link href={`/order/${payload.orderId}`}>Click here to see receipt</Link>
          </p>
        </div>
      );
    } catch( error ) {
      setModalMessage(
        <div className="save-error">Unable to create order</div>
      );
    }

    setConfirmModal(true);
  }

  const handleClearOrder = () => {
    orders.clearOrder();
  }

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
            {orders.items.map((item: OrderItem, index: number) => (
              <OrderMenuItem key={`order-item-${index}`} item={item}/>
            ))}
          </ul>
          <OrderSummary />
          <button className="order-create" onClick={handleCreateOrder}>
            <span className="icon"><BsReceipt/></span>
            <span className="label">Create Order</span>
          </button>
          <button className="order-clear" onClick={handleClearOrder}>
            <span className="icon"><BsXCircle/></span>
            <span className="label">Clear</span>
          </button>
        </div>
      )}
      <Modal modalState={confirmModal} hideControl={modalHideControl} closeLabel='OK' closeHandler={() => setConfirmModal(false)}>
        {modalMessage}
      </Modal>
    </div>
  );
}
