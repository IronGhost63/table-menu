import { MenuItem, OrderItem, Promotion } from "./definitions";
import { useMenu } from "./menu-context";

export const calculateSubtotal = ( orderItems: OrderItem[], menu: MenuItem[] ) => {
  return orderItems.reduce((sum: number, item: OrderItem) => {
    const menuItem = menu.find((menu: MenuItem) => menu.id === item.menuId);

    if ( !menuItem ) {
      return sum;
    }

    const current = item.quantity * menuItem.price;

    return sum+current;
  }, 0);
}

export const calculateDiscount = ( promotions: Promotion[], orderItems: OrderItem[], menu: MenuItem[], subtotal: number, isMember: boolean) => {
  const itemDiscount = promotions.map(promotion => {
    if ( !Object.hasOwn(promotion.required, 'itemId') || !Object.hasOwn(promotion.required, 'itemQuantity') ) {
      return 0;
    }

    const itemInOrder = orderItems.find((item: OrderItem) => item.menuId === promotion.required.itemId);

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

  return {itemDiscount, memberDiscount}
}
