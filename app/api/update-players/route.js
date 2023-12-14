import fs from 'fs'

import { scrapePlayerData } from "../../../lib/scrape"
import { bulkCreatePlayerItems } from '../../../src/dao/player_item_dao'
import { bulkCreatePlayerItemStats } from '../../../src/dao/player_item_stats_dao'

const parsePlayerItemCreationData = (playersData) => {
  const players = []
  const playersStats = []
  const now = new Date()
  playersData.forEach((playerData) => {
    const player = {
      id: playerData.playerItemId,
      name: playerData.playerName,
      club: playerData.playerClub,
      league: playerData.playerLeague,
      version: playerData.playerVersion,
      rating: playerData.playerRating,
      price: playerData.playerPrice,
      priceChange: playerData.playerPriceChange,
      accelType: playerData.playerAccelerationType,
      mainPosition: playerData.playerMainPosition,
      secondaryPositions: playerData.playerSecondaryPositions,
      attackWorkRate: playerData.playerAttackWorkRate,
      defenseWorkRate: playerData.playerDefenseWorkRate,
      weakFoot: playerData.playerWeakFoot,
      skillMoves: playerData.playerSkills,
      height: playerData.playerHeight,
      weight: playerData.playerWeight,
      bodyType: playerData.playerBodyType,
      PAC: playerData.playerPAC,
      SHO: playerData.playerSHO,
      PAS: playerData.playerPAS,
      DRI: playerData.playerDRI,
      DEF: playerData.playerDEF,
      PHY: playerData.playerPHY,
      popularity: playerData.playerPopularity,
      totalBaseStats: playerData.playerTotalBaseStats,
      totalInGameStats: playerData.playerTotalInGameStats,
      createdAt: now,
      updatedAt: now
    }

    const playerInGameStats = playerData.playerInGameStats

    const playerStats = playerInGameStats ?
      {
        playerItemId: playerData.playerItemId,
        acceleration: playerInGameStats.playerAcceleration,
        sprintSpeed: playerInGameStats.playerSprintSpeed,
        positioning: playerInGameStats.playerPositioning,
        finishing: playerInGameStats.playerFinishing,
        shotPower: playerInGameStats.playerShotPower,
        longShots: playerInGameStats.playerLongShots,
        volleys: playerInGameStats.playerVolleys,
        penalties: playerInGameStats.playerPenalties,
        vision: playerInGameStats.playerVision,
        crossing: playerInGameStats.playerCrossing,
        freeKickAccuracy: playerInGameStats.playerFKAccuracy,
        shortPassing: playerInGameStats.playerShortPassing,
        longPassing: playerInGameStats.playerLongPassing,
        curve: playerInGameStats.playerCurve,
        agility: playerInGameStats.playerAgility,
        balance: playerInGameStats.playerBalance,
        reactions: playerInGameStats.playerReactions,
        ballControl: playerInGameStats.playerBallControl,
        dribbling: playerInGameStats.playerDribbling,
        composure: playerInGameStats.playerComposure,
        interceptions: playerInGameStats.playerInterceptions,
        headingAccuracy: playerInGameStats.playerHeadingAccuracy,
        defensiveAwareness: playerInGameStats.playerDefensiveAwareness,
        standingTackle: playerInGameStats.playerStandingTackle,
        slidingTackle: playerInGameStats.playerSlidingTackle,
        jumping: playerInGameStats.playerJumping,
        stamina: playerInGameStats.playerStamina,
        strength: playerInGameStats.playerStrength,
        aggression: playerInGameStats.playerAggression
      }
      : null

    players.push(player)
    if (playerStats) {
      playersStats.push(playerStats)
    }
  })

  return { players, playersStats }
}

export async function POST(request) {
  const response = await scrapePlayerData('https://www.futbin.com/players?page=1')

  if (!response.done) {
    return Response.json({ error: response.error })
  }

  fs.writeFileSync('players.json', JSON.stringify(response.players, null, 2))

  const { players, playersStats } = parsePlayerItemCreationData(response.players)

  await bulkCreatePlayerItems(players)

  await bulkCreatePlayerItemStats(playersStats)

  return Response.json({ message: 'Scraped data successfully' })
}
