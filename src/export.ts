import type { User } from './users.js'

// Quote every field, and prefix values a spreadsheet would evaluate as a formula.
function csvField(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return `"${safe.replace(/"/g, '""')}"`
}

export function usersToCsv(users: User[]): string {
  const rows = users.map((user) => [user.id, user.name, user.email].map(csvField).join(','))
  return ['id,name,email', ...rows].join('\n')
}
