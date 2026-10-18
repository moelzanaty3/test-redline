import type { Mailer } from './mailer.js'
import type { User } from './users.js'

export async function sendWelcome(mailer: Mailer, user: User): Promise<void> {
  console.log(`sending welcome email to ${user.email}`)
  try {
    await mailer.send(user.email, 'Welcome to VOXI', `Hi ${user.name}`)
  } catch (error) {
    console.error('welcome email failed', { user, error })
  }
}
