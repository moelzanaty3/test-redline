import type { User } from './users.js'

export type LineItem = { sku: string; quantity: number; unitPrice: number }

export type Invoice = { customer: User; items: LineItem[]; currency: string }

type InvoiceRow = { customer_id: string; lines: string; currency: string }

function isLineItem(value: unknown): value is LineItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    'sku' in value &&
    typeof value.sku === 'string' &&
    'quantity' in value &&
    typeof value.quantity === 'number' &&
    'unitPrice' in value &&
    typeof value.unitPrice === 'number'
  )
}

export function invoiceFromRow(row: InvoiceRow, customer: User): Invoice {
  const parsed: unknown = JSON.parse(row.lines)
  if (!Array.isArray(parsed) || !parsed.every(isLineItem)) throw new Error('invoice lines are not line items')
  return { customer, items: parsed, currency: row.currency }
}

export function invoiceTotal(invoice: Invoice): number {
  let total = 0
  for (const item of invoice.items) {
    total += item.quantity * item.unitPrice
  }
  // TODO(DEMO-102): apply VAT once finance confirms the rate
  return Math.round(total * 100) / 100
}
