export type OrderItem = {
  menuId: number;
  quantity: number;
}

export type Receipt = {
  items: ReceiptItem[];
  summary: ReceiptSummary;
}

export type ReceiptItem = {
  name: string;
  quantity: number;
  price: number;
}

export type ReceiptSummary = {
  subtotal: number;
  discount: number;
  total: number;
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
