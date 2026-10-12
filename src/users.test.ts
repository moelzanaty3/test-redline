import { test } from 'node:test'
import assert from 'node:assert/strict'
import { UserDirectory, loadUser, requireUser } from './users.js'


test('a user that was added can be found', () => {
  const directory = new UserDirectory()
  directory.add({ id: 'u1', name: 'Ada', email: 'ada@example.com' })
  assert.equal(directory.find('u1')?.name, 'Ada')
})

test('the same id cannot be added twice', () => {
  const directory = new UserDirectory()
  directory.add({ id: 'u1', name: 'Ada', email: 'ada@example.com' })
  assert.throws(() => directory.add({ id: 'u1', name: 'Grace', email: 'grace@example.com' }))
})

test('a valid payload becomes a User', () => {
  const user = { id: 'u1', name: 'Ada', email: 'ada@example.com' }
  assert.deepEqual(loadUser(JSON.stringify(user)), user)
})

test('a payload missing a field is refused', () => {
  assert.throws(() => loadUser('{"id":"u1","name":"Ada"}'), /not a User/)
})

test('a missing user is refused without naming anyone', () => {
  assert.throws(() => requireUser(new UserDirectory(), 'u1'), /^Error: the requested user does not exist$/)
})