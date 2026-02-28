import { NextRequest } from "next/server";
import { Receipt } from "@/app/lib/definitions";
import { getDb } from "@/app/lib/database";
import { ordersTable } from "@/data/schema";

export async function POST(request: NextRequest) {
  try {
    const payload = <Receipt>(await request.json());
    const db = getDb();

    const order = await db
      .insert(ordersTable)
      .values({
        detail: JSON.stringify(payload)
      })
      .returning()
      .get();

    return Response.json({
      message: 'order successfully saved',
      orderId: order.id
    })
  } catch (error) {

  }
}
