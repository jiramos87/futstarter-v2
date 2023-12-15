import fs from 'fs'

import { getTotalPagesCount, scrapePlayerData } from "../../../../lib/scrape"
import { bulkCreatePlayerItems } from '../../../../src/dao/player_item_dao'
import { bulkCreatePlayerItemStats } from '../../../../src/dao/player_item_stats_dao'
import { sleep } from '../../../../src/utils/time_util'

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
  const pagesCountResponse = await getTotalPagesCount('https://www.futbin.com/players?version=gold_all')
  if (!pagesCountResponse.done) {
    return Response.json({ error: pagesCountResponse.error })
  }

  const totalPagesCount = pagesCountResponse.totalPagesCount
  console.log('totalPagesCount', totalPagesCount)
  await sleep(500)

  const accPlayerDataForJSON = []

  for (let i = 1; i <= totalPagesCount; i++) {
    console.log('page ', i)
    const response = await scrapePlayerData('https://www.futbin.com/players?version=gold_all&page=' + i)

    if (!response.done) {
      return Response.json({ error: response.error })
    }

    const { players, playersStats } = parsePlayerItemCreationData(response.players)
    console.log('playersStats[0].acceleration', playersStats[0].acceleration)

    accPlayerDataForJSON.push(...response.players)

    await bulkCreatePlayerItems(players)
    await  bulkCreatePlayerItemStats(playersStats)

    await sleep(200)
  }

  fs.writeFileSync('players.json', JSON.stringify(accPlayerDataForJSON, null, 2))

  return Response.json({ message: 'Scraped data successfully' })
}