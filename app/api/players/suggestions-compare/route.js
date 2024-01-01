import { Op } from "sequelize"
import { inspect } from "util"

import { findAllPlayerItems } from "../../../../src/dao/player_item_dao"
import { parsePlayerItems } from "../../helpers/player_helper"

const parsePlayerPosition = (playerPosition) => {
  if (!playerPosition) return null

  if (['LST', 'RST', 'ST'].includes(playerPosition)) return 'ST'
  if (['LCAM', 'RCAM', 'CAM'].includes(playerPosition)) return 'CAM'
  if (['LCM', 'RCM', 'CCM', 'CM'].includes(playerPosition)) return 'CM'
  if (['LDM', 'RDM', 'CCDM', 'CDM'].includes(playerPosition)) return 'CDM'
  if (['LCB', 'RCB', 'CCB', 'CB'].includes(playerPosition)) return 'CB'
  
  return playerPosition
}

const getPlayerFilters = (searchParams) => {
  const playerPosition = searchParams.get('position')
  const parsedPosition = parsePlayerPosition(playerPosition)

  const playerName = searchParams.get('playerName')

  const playerSearchConditions = {
    name: {
      [Op.not]: playerName
    },
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

  return playerSearchConditions
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)

    const squadAttributes = getPlayerFilters(searchParams)

    const sort = searchParams.get('sort') || 'rating'
    const order = searchParams.get('order') === 'asc' ? 'ASC' : 'DESC'
    const limit = searchParams.get('limit') || 10

    const foundPlayerItems = await findAllPlayerItems(
      squadAttributes,
      {
        limit,
        order: [[sort, order]]
      }
    )

    const parsedPlayerItems = foundPlayerItems.map((player) => parsePlayerItems(player))

    return Response.json({ playerItems: parsedPlayerItems }, { status: 200 })
  } catch (error) {
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}
