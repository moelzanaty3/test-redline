import { test } from 'node:test'
import assert from 'node:assert/strict'
import { invoiceFromRow, invoiceTotal } from './invoice.js'

const customer = { id: 'u1', name: 'Ada', email: 'ada@example.com' }

test('totals every line item to two decimal places', () => {
  const invoice = invoiceFromRow(
    {
      customer_id: 'u1',
      lines: '[{"sku":"A","quantity":2,"unitPrice":9.99},{"sku":"B","quantity":1,"unitPrice":0.01}]',
      currency: 'GBP',
    },
    customer
  )
  assert.equal(invoiceTotal(invoice), 19.99)
})
