import { Op } from 'sequelize'

import { getLoginSession } from '../../../lib/auth'
import { findAllPlayerItems } from '../../../src/dao/player_item_dao'
import { getStringWithLetterVariations } from '../../../src/utils/string_util'

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

  if (searchParams.get('rating')) {
    parsedSearchParams.rating = searchParams.get('rating')
  }

  if (searchParams.get('club')) {
    parsedSearchParams.club = searchParams.get('club')
  }

  if (searchParams.get('league')) {
    parsedSearchParams.league = searchParams.get('league')
  }

  if (searchParams.get('mainPosition')) {
    parsedSearchParams.mainPosition = searchParams.get('mainPosition')
  }

  if (searchParams.get('skillMoves')) {
    parsedSearchParams.skillMoves = searchParams.get('skillMoves')
  }

  if (searchParams.get('weakFoot')) {
    parsedSearchParams.weakFoot = searchParams.get('weakFoot')
  }

  return parsedSearchParams
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    console.log('searchParams', searchParams.get('name'))

    const user = await getLoginSession(request)

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }

    const parsedSearchParams = parseSearchParams(searchParams)

    const foundPlayerItems = await findAllPlayerItems(
      parsedSearchParams,
      { limit: 20, order: [['rating', 'DESC']] }
    )

    // this parsing is only for testing purposes. We will return the whole object in the future
    // with links to the images.
    const parsedPlayerItems = foundPlayerItems.map(playerItem => ({
      name: playerItem.name,
      rating: playerItem.rating,
      club: playerItem.club,
      league: playerItem.league,
      mainPosition: playerItem.mainPosition,
      skillMoves: playerItem.skillMoves,
      weakFoot: playerItem.weakFoot,
      PAC: playerItem.PAC,
      SHO: playerItem.SHO,
      PAS: playerItem.PAS,
      DRI: playerItem.DRI,
      DEF: playerItem.DEF,
      PHY: playerItem.PHY
    }))

    return Response.json({ playerItems: parsedPlayerItems }, { status: 200 })
  } catch (error) {
    return Response.error({ error: error.message }, { status: error.status || 500 })
  }
}
