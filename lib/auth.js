import jwt from 'jsonwebtoken'

import { MAX_AGE, getCookieToken, setTokenCookie } from './auth-cookies'

const TOKEN_SECRET = process.env.TOKEN_SECRET

export async function setLoginSession(session) {
  const createdAt = Date.now()

  const obj = { ...session, createdAt, maxAge: MAX_AGE }

  const token = jwt.sign(obj, TOKEN_SECRET, {
    expiresIn: MAX_AGE,
    algorithm: 'HS256'
  })

  setTokenCookie(token)

  return token
}

export async function getLoginSession(req) {
  const token = getCookieToken(req)

  if (!token) return

  const session = jwt.verify(token, TOKEN_SECRET, { algorithms: ['HS256'] })
  const expiresAt = session.createdAt + session.maxAge * 1000

  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session.dataValues
}

export async function getLoginSessionFromAuthorizationHeader(req) {
  const token = getCookieToken(req)

  if (!token) return

  const session = jwt.verify(token, TOKEN_SECRET, { algorithms: ['HS256'] })
  const expiresAt = session.createdAt + session.maxAge * 1000

  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session.dataValues
}