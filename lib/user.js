import crypto from 'crypto'

import { createUser } from '../src/dao/user_dao'

export async function createUserWithHashedPassword({ userName, email, password }) {
  const salt = process.env.AUTH_SALT

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  const user = {
    createdAt: Date.now(),
    userName,
    email,
    password: hash
  }

  const createdUser = await createUser(user)

  const parsedUser = JSON.parse(JSON.stringify(createdUser))

  return { user: parsedUser, createdAt: Date.now() }
}

export function validatePassword(user, inputPassword) {
  const salt = process.env.AUTH_SALT

  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
    .toString('hex')

  const passwordsMatch = user.password === inputHash

  return passwordsMatch
}
