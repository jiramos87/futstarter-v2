import models from '../../src/models'

export const createSquad = async (squad) => {
  const newSquad = await models.Squad.create(squad)

  return newSquad
}
