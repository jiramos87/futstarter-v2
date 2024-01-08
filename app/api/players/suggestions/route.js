import { Op } from 'sequelize'

import { findAllPlayerItems } from '../../../../src/dao/player_item_dao'
import { parsePlayerItems } from '../../helpers/player_helper'
import { parsePlayerPosition } from '../../../../src/helpers/player'

const applySquadAttributes = (squad, searchConditions) => {
  if (!squad || Object.values(squad).length === 0) return null

  const squadAttributes = {}

  Object.values(squad).forEach((player) => {
    if (!player) return null

    const { club, league, nation, name } = player

    if (club && club !== 'EA FC ICONS') {
      squadAttributes.club = squadAttributes.club || []
      squadAttributes.club.push(club)
    }

    if (league && league !== 'Icons') {
      squadAttributes.league = squadAttributes.league || []
      squadAttributes.league.push(league)
    }

    if (nation) {
      squadAttributes.nation = squadAttributes.nation || []
      squadAttributes.nation.push(nation)
    }

    if (name) {
      squadAttributes.name = squadAttributes.name || []
      squadAttributes.name.push(name)
    }
  })

  const squadClubsSet = new Set(squadAttributes.club)
  const squadLeaguesSet = new Set(squadAttributes.league)
  const squadNationsSet = new Set(squadAttributes.nation)
  const squadNamesSet = new Set(squadAttributes.name)

  const squadClubsArray = Array.from(squadClubsSet)
  const squadLeaguesArray = Array.from(squadLeaguesSet)
  const squadNationsArray = Array.from(squadNationsSet)
  const squadNamesArray = Array.from(squadNamesSet)

  const filters = []

  if (squadClubsArray.length > 0) {
    filters.push({ club: squadClubsArray })
  }

  if (squadLeaguesArray.length > 0) {
    filters.push({ league: squadLeaguesArray })
  }

  if (squadNationsArray.length > 0) {
    filters.push({ nation: squadNationsArray })
  }

  if (filters.length > 0) {
    searchConditions[Op.and].push({[Op.or]: filters })
  }

  searchConditions[Op.and].push({ name: { [Op.notIn]: squadNamesArray } })
}

const getPlayerFilters = (req) => {
  const { squad, playerPosition } = req

  const parsedPosition = parsePlayerPosition(playerPosition)

  const playerSearchConditions = {
    [Op.and]: [
      {[Op.or]: [
        { mainPosition: parsedPosition },
        {
          secondaryPositions: {
            [Op.like]: `%${parsedPosition}%`
          }
        }
      ]}
    ]
  }

  applySquadAttributes(squad, playerSearchConditions)

  return playerSearchConditions
}

export async function POST(request) {
  try {
    const req = await request.json()

    const squadAttributes = getPlayerFilters(req)

    const foundPlayerItems = await findAllPlayerItems(
      squadAttributes,
      {
        limit: 10,
        order: [['rating', 'DESC']]
      }
    )

    const parsedPlayerItems = foundPlayerItems.map((player) => parsePlayerItems(player))

    return Response.json({ playerItems: parsedPlayerItems }, { status: 200 })
  } catch (error) {
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}
