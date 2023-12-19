import { getLoginSession } from '../../../../../lib/auth'
import { createSquad } from '../../../../../src/dao/squad_dao'
import { createUserSquad, findAllUserSquads } from '../../../../../src/dao/user_squad_dao'

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

export async function GET (request, { params: { userId } }) {
  try {
    const user = await getLoginSession(request)

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }

    const userSquads = await findAllUserSquads({ userId, active: true })
    
    const squads = userSquads.map(userSquad => userSquad.squad)

    const filteredSquads = squads.filter(squad => squad !== null)

    const squadsByUpdateDate = filteredSquads.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })

    return Response.json({ squads: squadsByUpdateDate }, { status: 200 })
  } catch (error) {
    console.log('error', error)
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}