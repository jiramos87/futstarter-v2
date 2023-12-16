import models from '../../src/models'
import { inspect } from 'util'

export const bulkCreatePlayerItems = async (playersData) => {
  const playerData = await models.PlayerItem.bulkCreate(
    playersData,
    {
      updateOnDuplicate: [
        'name',
        'club',
        'league',
        'version',
        'rating',
        'price',
        'priceChange',
        'accelType',
        'mainPosition',
        'secondaryPositions',
        'attackWorkRate',
        'defenseWorkRate',
        'skillMoves',
        'weakFoot',
        'height',
        'weight',
        'bodyType',
        'popularity',
        'totalBaseStats',
        'totalInGameStats',
        'updatedAt'
      ],
    }
  )

  return playerData
}

export const findAllPlayerItems = async (searchConditions, options) => {
  console.log('searchConditions', inspect(searchConditions, { depth: 4 }))
  const playersData = await models.PlayerItem.findAll(
    {
      where: searchConditions || {},
      ...options,
      logging: console.log
    }
  )

  return playersData
}
