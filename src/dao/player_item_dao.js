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
        'updatedAt',
        'imageUrl',
        'nationId',
        'nationImageUrl',
        'clubId',
        'clubImageUrl',
        'leagueId',
        'leagueImageUrl',
        'playStylePlusId',
        'playStylePlusImageUrl'
      ],
    }
  )

  return playerData
}

export const findAllPlayerItems = async (searchConditions, options) => {
  const playersData = await models.PlayerItem.findAll(
    {
      where: searchConditions || {},
      include: [
        {
          model: models.PlayerItemStats,
          as: 'stats',
          required: false
        }
      ],
      ...options
    }
  )

  return playersData
}
