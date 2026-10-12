export type User = { id: string; name: string; email: string }

export class UserDirectory {
  private readonly users = new Map<string, User>()

  add(user: User): void {
    if (this.users.has(user.id)) throw new Error(`user ${user.id} already exists`)
    this.users.set(user.id, user)
  }

  find(id: string): User | undefined {
    return this.users.get(id)
  }

  count(): number {
    return this.users.size
  }
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'email' in value &&
    typeof value.email === 'string'
  )
}

export function loadUser(raw: string): User {
  const parsed: unknown = JSON.parse(raw)
  if (!isUser(parsed)) throw new Error('payload is not a User')
  return parsed
}

export function requireUser(directory: UserDirectory, id: string): User {
  const user = directory.find(id)
  if (!user) throw new Error('the requested user does not exist')
  return user
}
