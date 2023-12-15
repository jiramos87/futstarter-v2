import models from '../../src/models'

export const createUserSquad = async (userSquad) => {
  const newUserSquad = await models.UserSquad.create(userSquad)

  return newUserSquad
}