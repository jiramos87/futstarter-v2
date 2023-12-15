import models from '../../src/models'

export const bulkCreatePlayerItemStats = async (playersData) => {
  const playerStatsData = await models.PlayerItemStats.bulkCreate(
    playersData,
    {
      updateOnDuplicate: [
        'acceleration',
        'sprintSpeed',
        'positioning',
        'finishing',
        'shotPower',
        'longShots',
        'volleys',
        'penalties',
        'vision',
        'crossing',
        'freeKickAccuracy',
        'shortPassing',
        'longPassing',
        'curve',
        'agility',
        'balance',
        'reactions',
        'ballControl',
        'dribbling',
        'composure',
        'interceptions',
        'headingAccuracy',
        'defensiveAwareness',
        'standingTackle',
        'slidingTackle',
        'jumping',
        'stamina',
        'strength',
        'aggression',
        'updatedAt'
      ]
    }
  )

  return playerStatsData
}