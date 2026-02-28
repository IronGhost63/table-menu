"use client"

import { useState } from "react";
import { BsCheckSquare, BsSquare   } from "react-icons/bs";
import { useOrder } from "../lib/order-context";
import { usePromotion } from "../lib/promotion-context";
import { useMenu } from "../lib/menu-context";
import { calculateSubtotal, calculateDiscount } from "../lib/order-helper";

export default function OrderSummary() {
  const [isMember, setIsMember] = useState(false);

  const order = useOrder();
  const menu = useMenu()
  const promotions = usePromotion();
  const subtotal = calculateSubtotal(order.items, menu);
  const { itemDiscount, memberDiscount } = calculateDiscount(promotions, order.items, menu, subtotal, isMember);
  const totalDiscount = (itemDiscount+memberDiscount);
  const total = subtotal - Number(totalDiscount);

  const handleMembershipToggle = () => {
    order.setIsMember(!isMember);
    setIsMember(!isMember);
  }

  return (
    <div className="order-summary">
      <div className="membership-status">
        <button value={isMember ? 'yes' : 'no'} onClick={handleMembershipToggle} className={`membership-button ${isMember ? 'active' : ''}`}>
          <div className="membership-check">
            {isMember && (
              <BsCheckSquare/>
            )}
            {!isMember && (
              <BsSquare />
            )}
          </div>
          <span>Membership</span>
        </button>
      </div>
      <p className="summary-line subtotal">
        <span className="label">Subtotal</span>
        <span className="value">{subtotal.toFixed(2)} THB</span>
      </p>
      <p className="summary-line discount">
        <span className="label">Discount</span>
        <span className="value">{totalDiscount.toFixed(2)} THB</span>
      </p>
      <p className="summary-line total">
        <span className="label">Total</span>
        <span className="value">{total.toFixed(2)} THB</span>
      </p>
    </div>
  )
}
