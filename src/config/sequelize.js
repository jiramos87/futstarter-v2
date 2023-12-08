const { Sequelize } = require('sequelize')
const pg = require('pg')
require('dotenv').config()

const DATABASE_URI = process.env.DATABASE_URI || ''
const DATABASE_LOG = !process.env.DATABASE_LOG ? false : (process.env.DATABASE_LOG === 'true')

Sequelize.DATE.prototype._stringify = function _stringify (date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS')
}

let sequelizeFutstarterInstance = null

const commonOptions = {
  logging: DATABASE_LOG ? msg => console.log(msg) : false,
  define: {
    underscored: false,
    freezeTableName: true
  },
  timezone: '+00:00',
  dialect: 'postgres',
  dialectModule: pg
}

try {
  sequelizeFutstarterInstance = new Sequelize(DATABASE_URI, commonOptions)

  console.log('DB Connection has been established successfully.')
} catch (error) {
  console.log('Unable to connect to the database:', error)
}

module.exports = sequelizeFutstarterInstance
