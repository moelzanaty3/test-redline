import type { User } from './users.js'

export type LineItem = { sku: string; quantity: number; unitPrice: number }

export type Invoice = { customer: User; items: LineItem[]; currency: string }

type InvoiceRow = { customer_id: string; lines: string; currency: string }

export function invoiceFromRow(row: InvoiceRow, customer: User): Invoice {
  const items = JSON.parse(row.lines) as unknown as LineItem[]
  return { customer, items, currency: row.currency }
}

export function invoiceTotal(invoice: Invoice): number {
  let total = 0
  for (const item of invoice.items) {
    // @ts-ignore
    total += item.quantity * item.unitPrice
  }
  // TODO: apply VAT once finance confirms the rate
  return Math.round(total * 100) / 100
}
