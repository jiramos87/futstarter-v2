import models from '../../src/models'

export const findUser = async (searchConditions) => {
  const user = await models.User.findOne(searchConditions)

  return user
}

export const findUserByPk = async (id) => {
  const user = await models.User.findByPk(id)

  return user
}

export const createUser = async (user) => {
  const newUser = await models.User.create(user)

  return newUser
}
