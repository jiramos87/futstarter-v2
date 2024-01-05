import { parse } from 'cookie'
import jwt from 'jsonwebtoken'

import { TOKEN_NAME } from '../src/constants/auth'

export function getTokenFromDocumentCookie() {
  const cookies = parse(document.cookie)

  const tokenString = cookies[TOKEN_NAME]
  if (!tokenString) return null

  const token = tokenString.split('=')[1].split(';')[0]
  return token
}

export const getLoginSessionFromDocumentToken = async (token) => {
  if (!token) return

  const TOKEN_SECRET = 'd1e919bc33b412bd660d1b986573d36aae41fe7cbcb5878522c70bc6fe9a8882'

  const session = jwt.verify(token, TOKEN_SECRET, { algorithms: ['HS256'] })
  const expiresAt = session.createdAt + session.maxAge * 1000

  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session.dataValues

}
