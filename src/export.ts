import template from 'lodash/template.js'
import type { User } from './users.js'

const row = template('<%= id %>,<%= name %>,<%= email %>')

export function usersToCsv(users: User[]): string {
  return ['id,name,email', ...users.map((user) => row(user))].join('\n')
}
