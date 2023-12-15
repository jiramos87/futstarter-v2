import { getLoginSession } from '../../../../../lib/auth'
import { createSquad } from '../../../../../src/dao/squad_dao'
import { createUserSquad } from '../../../../../src/dao/user_squad_dao'

const createUserSquadModels = async (reqBody, userId) => {
  const squad = await createSquad(reqBody)

  const userSquad = await createUserSquad({ userId, squadId: squad.id })

  return userSquad
}

export async function POST (request, { params: { userId } }) {
  try {
    const user = await getLoginSession(request)

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }

    const req = await request.json()

    const squad = await createUserSquadModels(req, userId)

    return Response.json({ done: true, squad }, { status: 200 })
  } catch (error) {
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}