import fs from 'fs'
import path from 'path'
import { DataTypes, Op } from 'sequelize'

import { capitalizeSentence } from '../utils/string_util'
import sequelizeFutstarterInstance from '../config/sequelize'

const currentFilePath = new URL(import.meta.url).pathname
const currentDir = path.dirname(currentFilePath)

const modelFiles = fs.readdirSync(currentDir).filter((name) => (
  ['.model.', '_model.'].some((suffix) => name.includes(suffix))
))

const models = {}

modelFiles.forEach((nameFile) => {
  const cleanedName = nameFile.replace(/(\.|-|_)model\.js/, '')
  const modelName = capitalizeSentence(cleanedName, '_', '')

  models[modelName] = require(`./${nameFile}`).default(sequelizeFutstarterInstance, DataTypes)
})

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

export { sequelizeFutstarterInstance, Op }
export default models
