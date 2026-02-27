import { FC } from "react";
import { OrderItem } from "../lib/definitions";
import { useMenu } from "../lib/menu-context";
import { useOrder } from "../lib/order-context";

interface OrderMenuItemProp {
  item: OrderItem
}

const OrderMenuItem: FC<OrderMenuItemProp> = ({item}) => {
  const menu = useMenu();
  const order = useOrder();
  const currentItem = menu.find(menuItem => menuItem.id === item.menuId);

  return currentItem && (
    <li className="order-item">
      <div className="item-detail">
        <p className="item-name">{currentItem.name}</p>
        <p className="item-price">{currentItem.price} THB</p>
      </div>
      <div className="item-counter">
        <button className="item-decrease" onClick={() => order.removeOrderItem(item.menuId)}>-</button>
        <input type="text" className="item-quantity" value={item.quantity} readOnly />
        <button className="item-increase" onClick={() => order.addOrderItem(item.menuId)}>+</button>
      </div>
    </li>
  );
}

export default OrderMenuItem;
