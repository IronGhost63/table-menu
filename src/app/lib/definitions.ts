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
  type: string;
  required: {
    itemId?: number;
    itemQuantity?: number;
    member?: boolean;
  },
  discount: number;
}
