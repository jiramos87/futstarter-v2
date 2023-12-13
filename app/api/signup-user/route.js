import { Op } from 'sequelize'

import { findUser } from '../../../src/dao/user_dao'
import { createUserWithHashedPassword } from '../../../lib/user'
import { USER_ALREADY_EXISTS } from '../../../src/constants/errors'

export async function POST(request) {
  const req = await request.json()

  const { userName, email, password } = req

  try {
    const existingUser = await findUser(
      {
        where: {
          [Op.or]: [
            { email },
            { userName }
          ]
        }
      }
    )

    if (existingUser) {
      return Response.json({ message: USER_ALREADY_EXISTS }, { status: 409 })
    }

    const user = await createUserWithHashedPassword({ userName, email, password })

    return Response.json({ done: true, user }, { status: 200 })
  } catch (error) {
    return Response.error({ error: error.message }, { status: error.status })
  }
}
