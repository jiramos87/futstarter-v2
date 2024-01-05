import models from '../../src/models'

export const createSquad = async (squad) => {
  const newSquad = await models.Squad.create(squad)

  return newSquad
}

export const updateSquad = async (squad, squadId) => {
  const updatedSquad = await models.Squad.update(
    squad,
    { where: { id: squadId }}
  )

  return updatedSquad
}
