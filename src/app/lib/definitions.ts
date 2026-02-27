export type OrderItem = {
  menuId: number;
  quantity: number;
}

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  color?: string;
}

export type Promotion = {
  required: {
    itemId?: number;
    itemQuantity?: number;
  },
  discount: number;
}
