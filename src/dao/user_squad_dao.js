import models from '../../src/models'

export const createUserSquad = async (userSquad) => {
  const newUserSquad = await models.UserSquad.create(userSquad)

  return newUserSquad
}

export const findAllUserSquads = async (searchConditions) => {
  const userSquads = await models.UserSquad.findAll(
    {
      where: searchConditions,
      include: [
        {
          model: models.Squad,
          as: 'squad'
        }
      ]
    }
  )

  return userSquads
}

export const findUserSquad = async (searchConditions) => {
  const userSquad = await models.UserSquad.findOne(
    {
      where: searchConditions,
      include: [
        {
          model: models.Squad,
          as: 'squad'
        }
      ]
    }
  )

  return userSquad
}

export const updateUserSquad = async (userSquad, searchConditions) => {
  const updatedUserSquad = await models.UserSquad.update(
    userSquad,
    { where: searchConditions }
  )

  return updatedUserSquad
}
