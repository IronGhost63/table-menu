import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const ordersTable = sqliteTable('orders', {
  id: integer().primaryKey({ autoIncrement: true }),
  detail: text(),
});
