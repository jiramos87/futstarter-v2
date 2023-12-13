import { cookies } from 'next/headers'
import { serialize, parse } from 'cookie'

import { TOKEN_NAME } from '../src/constants/auth'

export const MAX_AGE = 60 * 60 * 8

export function setTokenCookie(token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })

  cookies().set(TOKEN_NAME, cookie)
}

export function removeTokenCookie() {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  cookies().set(cookie)
}

export function parseCookies(req) {
  const cookie = req.headers.get('cookie')

  return parse(cookie || '')
}

export function getTokenCookie(req) {
  const cookies = parseCookies(req)

  const tokenString = cookies[TOKEN_NAME]
  if (!tokenString) return null

  const token = tokenString.split('=')[1].split(';')[0]

  return token
}
