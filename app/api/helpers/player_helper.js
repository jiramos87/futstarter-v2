const getDetailedStats = (playerItem) => ({
  acceleration: playerItem.stats.acceleration,
  sprintSpeed: playerItem.stats.sprintSpeed,
  positioning: playerItem.stats.positioning,
  finishing: playerItem.stats.finishing,
  shotPower: playerItem.stats.shotPower,
  longShots: playerItem.stats.longShots,
  volleys: playerItem.stats.volleys,
  penalties: playerItem.stats.penalties,
  vision: playerItem.stats.vision,
  crossing: playerItem.stats.crossing,
  freeKickAccuracy: playerItem.stats.freeKickAccuracy,
  shortPassing: playerItem.stats.shortPassing,
  longPassing: playerItem.stats.longPassing,
  curve: playerItem.stats.curve,
  agility: playerItem.stats.agility,
  balance: playerItem.stats.balance,
  reactions: playerItem.stats.reactions,
  ballControl: playerItem.stats.ballControl,
  dribbling: playerItem.stats.dribbling,
  composure: playerItem.stats.composure,
  interceptions: playerItem.stats.interceptions,
  headingAccuracy: playerItem.stats.headingAccuracy,
  defensiveAwareness: playerItem.stats.defensiveAwareness,
  standingTackle: playerItem.stats.standingTackle,
  slidingTackle: playerItem.stats.slidingTackle,
  jumping: playerItem.stats.jumping,
  stamina: playerItem.stats.stamina,
  strength: playerItem.stats.strength,
  aggression: playerItem.stats.aggression
})

export const parsePlayerPrice = (price) => {
  if (price[price.length - 1] === 'K') {
    return Number(price.slice(0, price.length - 1)) * 1000
  } else if (price[price.length - 1] === 'M') {
    return Number(price.slice(0, price.length - 1)) * 1000000
  } else {
    return Number(price)
  }
}

const parseWeight = (weight) => {
  const weightInKg = weight.slice(weight.indexOf('(') + 1, weight.indexOf('kg'))
  return Number(weightInKg)
}

export const parsePlayerItems = (playerItem) => {
  let parsedPlayer = { 
    playerItemId: playerItem.id,
    name: playerItem.name,
    rating: playerItem.rating,
    club: playerItem.club,
    nation: playerItem.nation,
    league: playerItem.league,
    mainPosition: playerItem.mainPosition,
    secondaryPositions: playerItem.secondaryPositions,
    skillMoves: playerItem.skillMoves,
    weakFoot: playerItem.weakFoot,
    height: playerItem.height,
    weight: parseWeight(playerItem.weight),
    attackWorkRate: playerItem.attackWorkRate,
    defenseWorkRate: playerItem.defenseWorkRate,
    PAC: playerItem.PAC,
    SHO: playerItem.SHO,
    PAS: playerItem.PAS,
    DRI: playerItem.DRI,
    DEF: playerItem.DEF,
    PHY: playerItem.PHY,
    imageUrl: playerItem.imageUrl,
    price: Number(playerItem.price),
    nationId: playerItem.nationId,
    nationImageUrl: playerItem.nationImageUrl,
    clubId: playerItem.clubId,
    clubImageUrl: playerItem.clubImageUrl,
    leagueId: playerItem.leagueId,
    leagueImageUrl: playerItem.leagueImageUrl
  }

  if (playerItem.stats) {
    parsedPlayer = { ...parsedPlayer, ...getDetailedStats(playerItem) }
  }

  return parsedPlayer
}
