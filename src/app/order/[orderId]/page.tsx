import { eq } from 'drizzle-orm';
import { getDb } from "@/app/lib/database";
import { ordersTable } from "@/data/schema";
import { ReceiptItem } from "@/app/lib/definitions";

export default async function Page ({params}: { params: Promise<{ orderId: number }> }) {
  const { orderId } = await params;
  const db = getDb();

  const order = await db.select().from(ordersTable).where(eq(ordersTable.id, orderId)).get();

  if (!order) {
    return (
      <main className="main-container">
        Order not exists
      </main>
    );
  }

  const orderDetail = JSON.parse(order.detail || '');

  return (
    <main className="main-container">
      {orderDetail && (
        <div className="receipt-detail">
          <h1 className="title">Order #{orderId}</h1>
          <hr className="separator" />
          <ul className="items">
            {orderDetail.items.map((item: ReceiptItem, key: number) => (
              <li className="item" key={`item-${key}`}>
                <div className="item-detail">
                  <p className="name">{item.name}</p>
                  <p className="price">{item.unitPrice} THB</p>
                </div>
                <p className="quantity">{item.quantity}</p>
              </li>
            ))}
          </ul>
          <hr className="separator" />
          <p className="summary-line subtotal">
            <span className="label">Subtotal</span>
            <span className="value">{orderDetail.summary.subtotal.toFixed(2)} THB</span>
          </p>
          <p className="summary-line discount">
            <span className="label">Discount</span>
            <span className="value">{orderDetail.summary.discount.toFixed(2)} THB</span>
          </p>
          <p className="summary-line total">
            <span className="label">Total</span>
            <span className="value">{orderDetail.summary.total.toFixed(2)} THB</span>
          </p>
        </div>
      )}
    </main>
  )
}
