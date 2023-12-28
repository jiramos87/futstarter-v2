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

export const parsePlayerItems = (playerItem) => {
  let parsedPlayer = { 
    playerItemId: playerItem.id,
    name: playerItem.name,
    rating: playerItem.rating,
    club: playerItem.club,
    nation: playerItem.nation,
    league: playerItem.league,
    mainPosition: playerItem.mainPosition,
    skillMoves: playerItem.skillMoves,
    weakFoot: playerItem.weakFoot,
    height: playerItem.height,
    attackWorkRate: playerItem.attackWorkRate,
    defenseWorkRate: playerItem.defenseWorkRate,
    PAC: playerItem.PAC,
    SHO: playerItem.SHO,
    PAS: playerItem.PAS,
    DRI: playerItem.DRI,
    DEF: playerItem.DEF,
    PHY: playerItem.PHY,
    imageUrl: playerItem.imageUrl
  }

  if (playerItem.stats) {
    parsedPlayer = { ...parsedPlayer, ...getDetailedStats(playerItem) }
  }

  return parsedPlayer
}
