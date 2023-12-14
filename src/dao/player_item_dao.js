import models from '../../src/models'

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