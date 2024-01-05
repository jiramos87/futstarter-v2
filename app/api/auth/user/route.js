import { NextResponse } from 'next/server'

import { getLoginSession } from '../../../../lib/auth'
import { findUser } from '../../../../src/dao/user_dao'

export async function GET(request) {
  try {
    const session = await getLoginSession(request)

    const user = (session && (await findUser({ where: { email: session.email } }))) ?? null

    return NextResponse.json({ user: user.dataValues }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Authentication token is invalid, please log in' },
      { status: 500 }
    )
  }
}
