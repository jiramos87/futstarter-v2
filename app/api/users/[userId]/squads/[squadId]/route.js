import { getLoginSession } from '../../../../../../lib/auth'
import { updateSquad } from '../../../../../../src/dao/squad_dao'
import { findUserSquad, updateUserSquad } from '../../../../../../src/dao/user_squad_dao'

export async function GET(request, { params: { userId, squadId } }) {
  try {
    const user = await getLoginSession(request)

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }

    const userSquad = await findUserSquad({ userId, squadId, active: true })

    const squad = userSquad.squad

    return Response.json({ squad }, { status: 200 })
  } catch (error) {
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}

export async function PUT(request, { params: { userId, squadId } }) {
  try {
    const user = await getLoginSession(request)

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }

    const req = await request.json()

    await updateSquad(req, squadId)

    const updatedUserSquad = await findUserSquad({ userId, squadId })

    const updatedSquad = updatedUserSquad.squad

    return Response.json({ updatedSquad }, { status: 200 })
  } catch (error) {
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}

export async function DELETE(request, { params: { userId, squadId } }) {
  try {
    const user = await getLoginSession(request)

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }

    await updateUserSquad({ userId, squadId }, { active: false })

    return Response.json({ done: true }, { status: 200 })
  } catch (error) {
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}
