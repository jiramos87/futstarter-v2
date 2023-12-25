import { Op } from 'sequelize'

import { getLoginSession } from '../../../../lib/auth'
import { findAllPlayerItems } from '../../../../src/dao/player_item_dao'
import { getStringWithLetterVariations } from '../../../../src/utils/string_util'
import { parsePlayerItems } from '../../helpers/player_helper'

const parseSearchParams = (searchParams) => {
  const parsedSearchParams = {}

  if (searchParams.get('name')) {
    const name = searchParams.get('name')

    const nameRegex = getStringWithLetterVariations(name)

    parsedSearchParams.name = {
      [Op.or]: [
        { [Op.iLike]: `%${name}%` },
        { [Op.substring]: name },
        { [Op.iRegexp]: `${nameRegex}` }
      ]
    }
  }

  if (searchParams.get('league')) {
    parsedSearchParams.league = searchParams.get('league')
  }

  if (searchParams.get('club')) {
    parsedSearchParams.club = searchParams.get('club')
  }

  if (searchParams.get('nation')) {
    parsedSearchParams.nation = searchParams.get('nation')
  }

  if (searchParams.get('position')) {
    const position = searchParams.get('position')
  
    parsedSearchParams[Op.or] = [
      { mainPosition: position },
      { secondaryPositions: { [Op.substring]: position } }
    ]
  }

  if (searchParams.get('minRating') && searchParams.get('maxRating')) {
    parsedSearchParams.rating = {
      [Op.between]: [Number(searchParams.get('minRating')), Number(searchParams.get('maxRating'))]
    }
  }
  // if (searchParams.get('minPrice') && searchParams.get('maxPrice')) {
  //   parsedSearchParams.price = {
  //     [Op.between]: [Number(searchParams.get('minPrice')), Number(searchParams.get('maxPrice'))]
  //   }
  // }
  if (searchParams.get('minSkillMoves') && searchParams.get('maxSkillMoves')) {
    parsedSearchParams.skillMoves = {
      [Op.between]: [Number(searchParams.get('minSkillMoves')), Number(searchParams.get('maxSkillMoves'))]
    }
  }
  if (searchParams.get('minWeakFoot') && searchParams.get('maxWeakFoot')) {
    parsedSearchParams.weakFoot = {
      [Op.between]: [Number(searchParams.get('minWeakFoot')), Number(searchParams.get('maxWeakFoot'))]
    }
  }

  // if (searchParams.get('minHeight') && searchParams.get('maxHeight')) {
  //   parsedSearchParams.height = {
  //     [Op.between]: [Number(searchParams.get('minHeight')), Number(searchParams.get('maxHeight'))]
  //   }
  // }

  if (searchParams.get('minPAC') && searchParams.get('maxPAC')) {
    parsedSearchParams.PAC = {
      [Op.between]: [Number(searchParams.get('minPAC')), Number(searchParams.get('maxPAC'))]
    }
  }
  
  if (searchParams.get('minSHO') && searchParams.get('maxSHO')) {
    parsedSearchParams.SHO = {
      [Op.between]: [Number(searchParams.get('minSHO')), Number(searchParams.get('maxSHO'))]
    }
  }

  if (searchParams.get('minPAS') && searchParams.get('maxPAS')) {
    parsedSearchParams.PAS = {
      [Op.between]: [Number(searchParams.get('minPAS')), Number(searchParams.get('maxPAS'))]
    }
  }

  if (searchParams.get('minDRI') && searchParams.get('maxDRI')) {
    parsedSearchParams.DRI = {
      [Op.between]: [Number(searchParams.get('minDRI')), Number(searchParams.get('maxDRI'))]
    }
  }

  if (searchParams.get('minDEF') && searchParams.get('maxDEF')) {
    parsedSearchParams.DEF = {
      [Op.between]: [Number(searchParams.get('minDEF')), Number(searchParams.get('maxDEF'))]
    }
  }

  if (searchParams.get('minPHY') && searchParams.get('maxPHY')) {
    parsedSearchParams.PHY = {
      [Op.between]: [Number(searchParams.get('minPHY')), Number(searchParams.get('maxPHY'))]
    }
  }

  return parsedSearchParams
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)

    const user = await getLoginSession(request)

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }

    const parsedSearchParams = parseSearchParams(searchParams)

    const foundPlayerItems = await findAllPlayerItems(
      parsedSearchParams,
      { limit: 40, order: [['rating', 'DESC']] }
    )

    const parsedPlayerItems = foundPlayerItems.map(playerItem => parsePlayerItems(playerItem))

    return Response.json({ playerItems: parsedPlayerItems }, { status: 200 })
  } catch (error) {
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}
