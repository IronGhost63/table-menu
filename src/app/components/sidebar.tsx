"use client"

import { useState } from "react";
import { BsReceipt, BsXCircle  } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useOrder } from "../lib/order-context";
import { OrderItem } from "../lib/definitions";
import OrderMenuItem from "./order-menu-item";
import OrderSummary from "../components/order-summary";
import Modal from "../components/modal";

export default function Sidebar() {
  const defaultModal = <div className="modal-loading-content"><CgSpinner className="spinner"/></div>;
  const orders = useOrder();
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(defaultModal);
  const [modalHideControl, setModalHideControl] = useState(false);

  const handleCreateOrder = () => {
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
            {orders.items.map((item: OrderItem) => (
              <OrderMenuItem item={item}/>
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
