import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

import { sleep } from '../src/utils/time_util'

import { parsePlayerPrice } from '../app/api/helpers/player_helper';

const createFoldersIfNotExist = () => {
  const folders = ['players', 'nations', 'clubs', 'leagues'];
  const basePath = path.join(process.cwd(), 'public');

  folders.forEach(folder => {
    const folderPath = path.join(basePath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  });
};

const DEVICES = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
]

export const getRandomUserAgent = () => {
  const randomIndex = Math.floor(Math.random() * DEVICES.length)
  return DEVICES[randomIndex]
}

const setPageConfiguration = async (page, url) => {
  const userAgent = getRandomUserAgent()

  await page.setUserAgent(userAgent)

  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.futbin.com/',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive'
  })

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 })

  await page.setViewport({width: 1080, height: 1024})

  page.on('console', async (msg) => {
    for (let i = 0; i < msg.args().length; ++i) {
      const val = await msg.args()[i].jsonValue();
      if (typeof val === 'object') {
        console.log(`${i}: ${JSON.stringify(val)}`);
      } else {
        console.log(`${i}: ${val}`);
      }
    }
  })
}

const getBasicPlayerData = async (page) => {
  const data = await page.evaluate(() => {
    const extractedData = { players: []}

    const elements = document.querySelectorAll('.player_name_players_table')

    elements.forEach(async (element) => {
      const dataSiteId = element.getAttribute('data-site-id')

      const parentDiv = element.parentNode.parentNode

      const basicChildElements = parentDiv.querySelectorAll('a[data-original-title]')

      const basicChildValues = []
      basicChildElements.forEach((childElement) => {
        const originalTitle = childElement.getAttribute('data-original-title')

        basicChildValues.push(originalTitle)
      })
      const playerNode = parentDiv.parentNode.parentNode

      const tableRowTextNode = parentDiv.parentNode

      const tableRowTextNodeChildren = tableRowTextNode.querySelectorAll('div')
      const tableRowTextNodeChildrenArray = Array.from(tableRowTextNodeChildren)

      const imageDiv = tableRowTextNodeChildrenArray[0]

      const imageDivChildren = imageDiv.querySelectorAll('img')
      const imageDivChildrenArray = Array.from(imageDivChildren)

      const playerImageUrl = imageDivChildrenArray[0].getAttribute('data-original')

      const logosAndNameDiv = tableRowTextNodeChildrenArray[1]
      const logosAndNameDivChildrenDivs = logosAndNameDiv.querySelectorAll('div')
      const logosAndNameChildreDivsArray = Array.from(logosAndNameDivChildrenDivs)

      const logosDiv = logosAndNameChildreDivsArray[1]
      const logosDivChildrenSpans = logosDiv.querySelectorAll('span')
      const logosDivChildrenSpansArray = Array.from(logosDivChildrenSpans)

      const mainLogosImageLinkChildren = logosDivChildrenSpansArray[0].querySelectorAll('a')
      const mainLogosImageLinkChildrenArray = Array.from(mainLogosImageLinkChildren)

      const clubLogoImageLinkElement = mainLogosImageLinkChildrenArray[0]
      const clubLogoUrlImage = clubLogoImageLinkElement.querySelector('img')
      const clubLogoUrl = clubLogoUrlImage.getAttribute('src')

      const nationLogoImageLinkElement  = mainLogosImageLinkChildrenArray[1]
      const nationLogoUrlImage = nationLogoImageLinkElement.querySelector('img')
      const nationLogoUrl = nationLogoUrlImage.getAttribute('src')

      const leagueLogoImageLinkElement  = mainLogosImageLinkChildrenArray[2]
      const leagueLogoUrlImage = leagueLogoImageLinkElement.querySelector('img')
      const leagueLogoUrl = leagueLogoUrlImage.getAttribute('src')

      // const playStyleDivChildren = logosDiv.querySelectorAll('div')
      // const playStyleDivChildrenArray = Array.from(playStyleDivChildren)
      // const playStyleDiv = playStyleDivChildrenArray[0]

      // const playStyleDivChild = playStyleDiv.querySelectorAll('div')
      // const playStyleDivChildArray = Array.from(playStyleDivChild)
      // console.log('playStyleDivChildArray.length', playStyleDivChildArray.length)

      // let playStyleLogoUrl = null
      // if (playStyleDivChildArray.length) {
      //   const playStyleDivChildChildren = playStyleDivChildArray.querySelectorAll('div')

      //   const playStyleLogosImageLinkChildren = playStyleDivChildChildren[1].querySelectorAll('a')
      //   const playStyleLogosImageLinkChildrenArray = Array.from(playStyleLogosImageLinkChildren)
      //   const playStyleLogoImageLinkElement  = playStyleLogosImageLinkChildrenArray[0]
      //   const playStyleLogoUrlImage = playStyleLogoImageLinkElement.querySelector('img')
      //   playStyleLogoUrl = playStyleLogoUrlImage.getAttribute('src')
      // }

      // console.log('playStyleLogoUrl', playStyleLogoUrl)

      const spanWithRatingClass = playerNode.querySelector('span[class*="rating"]')
      const rating = spanWithRatingClass ? Number(spanWithRatingClass.textContent.trim()) : null

      const playerTableCells = playerNode.querySelectorAll('td')
      const tableCellsArray = Array.from(playerTableCells)

      const playerPositions = tableCellsArray[3]

      const playerPositionsChildren = playerPositions.querySelectorAll('div')
      const positionsArray = Array.from(playerPositionsChildren)

      const mainPosition = positionsArray[0].textContent.trim()
      const secondaryPositions = positionsArray[1].textContent.trim()

      const versionCell = tableCellsArray[4]
      const versionCellChildren = versionCell.querySelectorAll('div')
      const versionCellArray = Array.from(versionCellChildren)

      const version = versionCellArray[0].textContent.trim()
      const accelerationType = versionCellArray[1].textContent.trim()

      const playerPriceCell = tableCellsArray[5]
      const priceCellSpan = playerPriceCell.querySelector('span')
      const price = priceCellSpan ? priceCellSpan.textContent.trim() : null

      const priceCellDiv = playerPriceCell.querySelector('div')
      const priceChange = priceCellDiv ? priceCellDiv.textContent.trim() : null

      const playerSkillCell = tableCellsArray[6]
      const skills = Number(playerSkillCell.textContent.trim())

      const playerWeakFootCell = tableCellsArray[7]
      const weakFoot = Number(playerWeakFootCell.textContent.trim())

      const workRateCell = tableCellsArray[8]
      const workRateCellChildren = workRateCell.querySelectorAll('span')
      const workRateCellArray = Array.from(workRateCellChildren)

      const attackWorkRate = workRateCellArray[0].textContent.trim()
      const defenseWorkRate = workRateCellArray[1].textContent.trim()

      const playerPaceCell = tableCellsArray[9]
      const PAC = Number(playerPaceCell.textContent.trim())

      const playerShootingCell = tableCellsArray[10]
      const SHO = Number(playerShootingCell.textContent.trim())

      const playerPassingCell = tableCellsArray[11]
      const PAS = Number(playerPassingCell.textContent.trim())

      const playerDribblingCell = tableCellsArray[12]
      const DRI = Number(playerDribblingCell.textContent.trim())

      const playerDefendingCell = tableCellsArray[13]
      const DEF = Number(playerDefendingCell.textContent.trim())

      const playerPhysicalityCell = tableCellsArray[14]
      const PHY = Number(playerPhysicalityCell.textContent.trim())

      const playerBodyCell = tableCellsArray[15]
      const playerBodyCellChildren = playerBodyCell.querySelectorAll('div')
      const playerBodyCellArray = Array.from(playerBodyCellChildren)

      const height = playerBodyCellArray[0].textContent.trim()
      
      const secondBodyCell = playerBodyCellArray[1]
      const weight = secondBodyCell ? secondBodyCell.textContent.trim() : null
      const playerBodyTypeElement = playerBodyCell.querySelector('a')

      const bodyType = playerBodyTypeElement ? playerBodyTypeElement.textContent.trim() : null

      const playerPopularityCell = tableCellsArray[16]
      const popularity = Number(playerPopularityCell.textContent.trim())

      const playerBaseStatsCell = tableCellsArray[17]
      const baseStats = Number(playerBaseStatsCell.textContent.trim())

      const playerInGameStatsCell = tableCellsArray[18]
      const inGameStats = Number(playerInGameStatsCell.textContent.trim())

      extractedData.players.push({
        playerItemId: Number(dataSiteId),
        playerName: element.textContent.trim(),
        playerClub: basicChildValues[0],
        playerNation: basicChildValues[1],
        playerLeague: basicChildValues[2],
        playerRating: rating,
        playerMainPosition: mainPosition,
        playerSecondaryPositions: secondaryPositions,
        playerVersion: version,
        playerAccelerationType: accelerationType,
        playerPrice: price,
        playerPriceChange: priceChange,
        playerSkills: skills,
        playerWeakFoot: weakFoot,
        playerAttackWorkRate: attackWorkRate,
        playerDefenseWorkRate: defenseWorkRate,
        playerPAC: PAC,
        playerSHO: SHO,
        playerPAS: PAS,
        playerDRI: DRI,
        playerDEF: DEF,
        playerPHY: PHY,
        playerHeight: height,
        playerWeight: weight,
        playerBodyType: bodyType,
        playerPopularity: popularity,
        playerTotalBaseStats: baseStats,
        playerTotalInGameStats: inGameStats,
        playerFutbinImageUrl: playerImageUrl,
        playerFutbinClubLogoUrl: clubLogoUrl,
        playerFutbinNationLogoUrl: nationLogoUrl,
        playerFutbinLeagueLogoUrl: leagueLogoUrl
      })
    })

    return extractedData
  })

  return data
}

const getAllPlayersFullData = async (page, data) => {
  const playerItemsObject = {}
  const playerItemIds = data.players.map((player, index) => {
    playerItemsObject[index] = player.playerItemId
  })

  const allPlayersFullData = []

  const playerKeys = Object.keys(playerItemsObject)

  for (const key of playerKeys) {
    const playerId = playerItemsObject[key]
    console.log('getting playerId:', playerId)
    const evaluateData = { key, data }
    await page.evaluate(async (evaluateData) => {
      const { key } = evaluateData
      
      const playerStatsItemSelector = 'div[data-playerid]'
      const playerStatsElements = document.querySelectorAll(playerStatsItemSelector)
      const playerStatsElementsArray = Array.from(playerStatsElements)

      const playerStatsElement = playerStatsElementsArray[key]

      playerStatsElement.click()
    }, evaluateData)

    await sleep(300)

    const playerFullData = await page.evaluate(async (evaluateData) => {
      const { key, data } = evaluateData

      const playerId = data.players[key].playerItemId
      const playerData = data.players.find((player) => player.playerItemId === Number(playerId))

      const displayedStatsItemSelector = `tr#player-${Number(playerId)}`

      const playerRow = document.querySelector(displayedStatsItemSelector)

      const subStatRatingElements = playerRow.querySelectorAll('div.sub-stat-rating')
      const subStatRatingDivs = Array.from(subStatRatingElements)

      if (subStatRatingDivs.length === 0) { 
        playerData.playerInGameStats = null
        return playerData
      }
      
      const acceleration = subStatRatingDivs[0].textContent.trim()
      const sprintSpeed = subStatRatingDivs[1].textContent.trim()
      const positioning = subStatRatingDivs[2].textContent.trim()
      const finishing = subStatRatingDivs[3].textContent.trim()
      const shotPower = subStatRatingDivs[4].textContent.trim()
      const longShots = subStatRatingDivs[5].textContent.trim()
      const volleys = subStatRatingDivs[6].textContent.trim()
      const penalties = subStatRatingDivs[7].textContent.trim()
      const vision = subStatRatingDivs[8].textContent.trim()
      const crossing = subStatRatingDivs[9].textContent.trim()
      const fKAccuracy = subStatRatingDivs[10].textContent.trim()
      const shortPassing = subStatRatingDivs[11].textContent.trim()
      const longPassing = subStatRatingDivs[12].textContent.trim()
      const curve = subStatRatingDivs[13].textContent.trim()
      const agility = subStatRatingDivs[14].textContent.trim()
      const balance = subStatRatingDivs[15].textContent.trim()
      const reactions = subStatRatingDivs[16].textContent.trim()
      const ballControl = subStatRatingDivs[17].textContent.trim()
      const dribbling = subStatRatingDivs[18].textContent.trim()
      const composure = subStatRatingDivs[19].textContent.trim()
      const interceptions = subStatRatingDivs[20].textContent.trim()
      const headingAccuracy = subStatRatingDivs[21].textContent.trim()
      const defensiveAwareness = subStatRatingDivs[22].textContent.trim()
      const standingTackle = subStatRatingDivs[23].textContent.trim()
      const slidingTackle = subStatRatingDivs[24].textContent.trim()
      const jumping = subStatRatingDivs[25].textContent.trim()
      const stamina = subStatRatingDivs[26].textContent.trim()
      const strength = subStatRatingDivs[27].textContent.trim()
      const aggression = subStatRatingDivs[28].textContent.trim()

      const extractedData = {
        playerItemId: Number(playerId),
        playerAcceleration: Number(acceleration),
        playerSprintSpeed: Number(sprintSpeed),
        playerPositioning: Number(positioning),
        playerFinishing: Number(finishing),
        playerShotPower: Number(shotPower),
        playerLongShots: Number(longShots),
        playerVolleys: Number(volleys),
        playerPenalties: Number(penalties),
        playerVision: Number(vision),
        playerCrossing: Number(crossing),
        playerFKAccuracy: Number(fKAccuracy),
        playerShortPassing: Number(shortPassing),
        playerLongPassing: Number(longPassing),
        playerCurve: Number(curve),
        playerAgility: Number(agility),
        playerBalance: Number(balance),
        playerReactions: Number(reactions),
        playerBallControl: Number(ballControl),
        playerDribbling: Number(dribbling),
        playerComposure: Number(composure),
        playerInterceptions: Number(interceptions),
        playerHeadingAccuracy: Number(headingAccuracy),
        playerDefensiveAwareness: Number(defensiveAwareness),
        playerStandingTackle: Number(standingTackle),
        playerSlidingTackle: Number(slidingTackle),
        playerJumping: Number(jumping),
        playerStamina: Number(stamina),
        playerStrength: Number(strength),
        playerAggression: Number(aggression)
      }

      playerData.playerInGameStats = extractedData

      return playerData
    }, evaluateData)

    allPlayersFullData.push(playerFullData)
  }

  return allPlayersFullData
}

const getImageId = (imageUrl) => {
  const segments = imageUrl.split('/')
  const fileName = segments[segments.length - 1]

  const numberPart = fileName.substring(0, fileName.indexOf('.'))

  return numberPart
}

const savePlayerImage = async (page, playerData) => {
  const { playerItemId, playerFutbinImageUrl } = playerData
  try {
    const source = await page.goto(playerFutbinImageUrl, { waitUntil: 'networkidle0' })

    const imageBuffer = await source.buffer()

    if (imageBuffer) {
      const imagePath = path.join(process.cwd(), `public/players/${playerItemId}.png`)
      if (!fs.existsSync(imagePath)) {

        fs.writeFileSync(imagePath, imageBuffer)
      }
      playerData.playerImageUrl = `/players/${playerItemId}.png`
    } else {
      console.log(`No image found for player ID ${playerItemId}`)
    }
  } catch (error) {
    console.error(`Error processing player ID ${playerItemId}:`, error)
  }
}

const savePlayerNationImage = async (page, playerData) => {
  const { playerFutbinNationLogoUrl, playerItemId } = playerData
  try {
    const source = await page.goto(playerFutbinNationLogoUrl, { waitUntil: 'networkidle0' })

    const imageBuffer = await source.buffer()

    if (imageBuffer) {
      const imageId = getImageId(playerFutbinNationLogoUrl)
      const imagePath = path.join(process.cwd(), `public/nations/${imageId}.png`)
      if (!fs.existsSync(imagePath)) {
        fs.writeFileSync(imagePath, imageBuffer)
      }
      playerData.playerNationLogoUrl = `/nations/${imageId}.png`
      playerData.playerNationId = Number(imageId)
    } else {
      console.log(`No nation image found for player ID ${playerItemId}`)
    }
  } catch (error) {
    console.error(`Error processing nation image for player ID ${playerItemId}:`, error)
  }
}

const savePlayerClubImage = async (page, playerData) => {
  const { playerFutbinClubLogoUrl, playerItemId } = playerData
  try {
    const source = await page.goto(playerFutbinClubLogoUrl, { waitUntil: 'networkidle0' })

    const imageBuffer = await source.buffer()

    if (imageBuffer) {
      const imageId = getImageId(playerFutbinClubLogoUrl)
      const imagePath = path.join(process.cwd(), `public/clubs/${imageId}.png`)
      if (!fs.existsSync(imagePath)) {
        fs.writeFileSync(imagePath, imageBuffer)
      }
      playerData.playerClubLogoUrl = `/clubs/${imageId}.png`
      playerData.playerClubId = Number(imageId)
    } else {
      console.log(`No club image found for player ID ${playerItemId}`)
    }
  } catch (error) {
    console.error(`Error processing club image for player ID ${playerItemId}:`, error)
  }
}

const savePlayerLeagueImage = async (page, playerData) => {
  const { playerFutbinLeagueLogoUrl, playerItemId } = playerData
  try {
    const source = await page.goto(playerFutbinLeagueLogoUrl, { waitUntil: 'networkidle0' })

    const imageBuffer = await source.buffer()

    if (imageBuffer) {
      const imageId = getImageId(playerFutbinLeagueLogoUrl)
      const imagePath = path.join(process.cwd(), `public/leagues/${imageId}.png`)
      if (!fs.existsSync(imagePath)) {
        fs.writeFileSync(imagePath, imageBuffer)
      }
      playerData.playerLeagueLogoUrl = `/leagues/${imageId}.png`
      playerData.playerLeagueId = Number(imageId)
    } else {
      console.log(`No league image found for player ID ${playerItemId}`)
    }
  } catch (error) {
    console.error(`Error processing league image for player ID ${playerItemId}:`, error)
  }
}

export const savePlayerPlayStylePlusImage = async (page, playerData) => {
  const { playerFutbinPlayStyleLogoUrl, playerItemId } = playerData
  try {
    const source = await page.goto(playerFutbinPlayStyleLogoUrl, { waitUntil: 'networkidle0' })

    const imageBuffer = await source.buffer()

    if (imageBuffer) {
      const imageId = getImageId(playerFutbinPlayStyleLogoUrl)
      const imagePath = path.join(process.cwd(), `public/playstyles/${imageId}.png`)
      if (!fs.existsSync(imagePath)) {
        fs.writeFileSync(imagePath, imageBuffer)
      }
      playerData.playerPlayStylePlusLogoUrl = `/playstyles/${imageId}.png`
      playerData.playerPlayStyleId = imageId
    } else {
      console.log(`No playstyle image found for player ID ${playerItemId}`)
    }
  } catch (error) {
    console.error(`Error processing playstyle image for player ID ${playerItemId}:`, error)
  }
}

export const uploadPlayerImages = async (page, playerData) => {
  await savePlayerImage(page, playerData)
  await sleep(100)
  await savePlayerNationImage(page, playerData)
  await sleep(100)
  await savePlayerClubImage(page, playerData)
  await sleep(100)
  await savePlayerLeagueImage(page, playerData)
  await sleep(100)
  // await savePlayerPlayStylePlusImage(page, playerData)
  // await sleep(200)
}

export const processPlayerData = async (page, basicPlayerData) => {
  for (const playerData of basicPlayerData.players) {
    console.log('scrapping images for player:', playerData.playerName)
    await uploadPlayerImages(page, playerData)

    playerData.playerParsedPrice = parsePlayerPrice(playerData.playerPrice)
  }
}

export const scrapePlayerData = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  try {
    await setPageConfiguration(page, url)

    const basicPlayerData = await getBasicPlayerData(page)

    await sleep(300)

    createFoldersIfNotExist()

    await processPlayerData(page, basicPlayerData)

    await sleep(300)

    await setPageConfiguration(page, url)

    const allPlayersFullData = await getAllPlayersFullData(page, basicPlayerData)

    return { done: true, players: allPlayersFullData }
  } catch (error) {
    console.error('Error scraping player data:', error)
    return { done: false, error: error.message }
  } finally {
    await page.close()
    await browser.close()
  }
}

export const getTotalPagesCount = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  try {
    await setPageConfiguration(page, url)

    const totalPagesCount = await page.evaluate(() => {
      const paginationDiv = document.querySelector('ul.pagination')

      const paginationDivChildren = paginationDiv.querySelectorAll('li')
      const paginationDivChildrenArray = Array.from(paginationDivChildren)
      const lastPageElement = paginationDivChildrenArray[paginationDivChildrenArray.length - 2]

      const lastPageElementLink = lastPageElement.querySelector('a')
      const lastPageNumber = lastPageElementLink.textContent.trim()

      return Number(lastPageNumber)
    })

    return { done: true, totalPagesCount }
  } catch (error) {
    console.error('Error getting total pages count:', error)
    return { done: false, error: error.message }
  } finally {
    await page.close()
    await browser.close()
  }
}
