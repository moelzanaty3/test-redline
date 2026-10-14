import { test } from 'node:test'
import assert from 'node:assert/strict'
import { usersToCsv } from './export.js'

test('quotes fields and neutralises spreadsheet formulas', () => {
  const csv = usersToCsv([
    { id: 'u1', name: 'Ada "the first"', email: 'ada@example.com' },
    { id: 'u2', name: '=HYPERLINK("http://evil")', email: 'x@example.com' },
  ])
  assert.equal(
    csv,
    [
      'id,name,email',
      '"u1","Ada ""the first""","ada@example.com"',
      '"u2","\'=HYPERLINK(""http://evil"")","x@example.com"',
    ].join('\n')
  )
})
