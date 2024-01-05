import { setLoginSession } from '../../../../lib/auth'
import { findUser } from '../../../../src/dao/user_dao'
import { validatePassword } from '../../../../lib/user'

export async function POST(request) {
  const req = await request.json()

  try {
    const user = await findUser({ where: { email: req.email } })

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }

    if (!validatePassword(user, req.password)) {
      return Response.json({ message: 'Wrong password' }, { status: 401 })
    }

    const session = { ...user }

    const token = await setLoginSession(session)

    return Response.json({ done: true, token }, { status: 200, headers: { 'Authorization': `${token}` } })  

  } catch (error) {
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}
