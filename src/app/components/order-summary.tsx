"use client"

import { useState } from "react";
import { BsCheckSquare, BsSquare   } from "react-icons/bs";
import { useMenu } from "../lib/menu-context";
import { useOrder } from "../lib/order-context";
import { usePromotion } from "../lib/promotion-context";
import { MenuItem, OrderItem } from "../lib/definitions";

export default function OrderSummary() {
  const [isMember, setIsMember] = useState(false);

  const menu = useMenu();
  const order = useOrder();
  const promotions = usePromotion();

  const subtotal = order.items.reduce((sum: number, item: OrderItem) => {
    const menuItem = menu.find((menu: MenuItem) => menu.id === item.menuId);

    if ( !menuItem ) {
      return sum;
    }

    const current = item.quantity * menuItem.price;

    return sum+current;
  }, 0);

  const itemDiscount = promotions.map(promotion => {
    if ( !Object.hasOwn(promotion.required, 'itemId') || !Object.hasOwn(promotion.required, 'itemQuantity') ) {
      return 0;
    }

    const itemInOrder = order.items.find((item: OrderItem) => item.menuId === promotion.required.itemId);

    if ( !itemInOrder ) {
      return 0;
    }

    if ( itemInOrder.quantity < (promotion.required.itemQuantity || 0)) {
      return 0;
    }

    const itemDetail = menu.find((item: MenuItem) => item.id === promotion.required.itemId);

    if ( !itemDetail ){
      return 0;
    }

    const discount = (itemInOrder.quantity * itemDetail.price) * promotion.discount;

    return discount;
  }).reduce((sum: number, discount: number) => sum+discount, 0);

  const memberDiscount = isMember ? (subtotal-itemDiscount) * 0.1 : 0;
  const totalDiscount = (itemDiscount+memberDiscount);
  const total = subtotal - Number(totalDiscount);

  const handleMembershipToggle = () => {
    console.log('hello')
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
