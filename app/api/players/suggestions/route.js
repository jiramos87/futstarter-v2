import { Op } from 'sequelize'

import { findAllPlayerItems } from '../../../../src/dao/player_item_dao'
import { parsePlayerItems } from '../../helpers/player_helper'

const applySquadAttributes = (squad, searchConditions) => {
  if (!squad || Object.values(squad).length === 0) return null

  const squadAttributes = {}

  Object.values(squad).forEach((player) => {
    if (!player) return null
    const { club, league, nation } = player

    if (club) {
      squadAttributes.club = squadAttributes.club || []
      squadAttributes.club.push(club)
    }

    if (league) {
      squadAttributes.league = squadAttributes.league || []
      squadAttributes.league.push(league)
    }

    if (nation) {
      squadAttributes.nation = squadAttributes.nation || []
      squadAttributes.nation.push(nation)
    }
  })

  const squadClubsSet = new Set(squadAttributes.club)
  const squadLeaguesSet = new Set(squadAttributes.league)
  const squadNationsSet = new Set(squadAttributes.nation)

  const squadClubsArray = Array.from(squadClubsSet)
  const squadLeaguesArray = Array.from(squadLeaguesSet)
  const squadNationsArray = Array.from(squadNationsSet)

  searchConditions[Op.and].push({[Op.or]: [
    { club: squadClubsArray },
    { league: squadLeaguesArray },
    { nation: squadNationsArray }
  ]})
}

const parsePlayerPosition = (playerPosition) => {
  if (!playerPosition) return null

  if (['LST', 'RST', 'ST'].includes(playerPosition)) return 'ST'
  if (['LCAM', 'RCAM', 'CAM'].includes(playerPosition)) return 'CAM'
  if (['LCM', 'RCM', 'CCM', 'CM'].includes(playerPosition)) return 'CM'
  if (['LDM', 'RDM', 'CCDM', 'CDM'].includes(playerPosition)) return 'CDM'
  if (['LCB', 'RCB', 'CCB', 'CB'].includes(playerPosition)) return 'CB'
  
  return playerPosition
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
        limit: 20,
        order: [['rating', 'DESC']]
      }
    )

    const parsedPlayerItems = foundPlayerItems.map((player) => parsePlayerItems(player))

    return Response.json({ playerItems: parsedPlayerItems }, { status: 200 })
  } catch (error) {
    console.log('error', error)
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}
