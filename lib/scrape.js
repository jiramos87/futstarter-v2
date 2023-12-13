import puppeteer from 'puppeteer'

export const scrapePlayerData = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  try {
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.futbin.com/',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Connection': 'keep-alive'
    });

    await page.goto(url, { waitUntil: 'networkidle2' })

    await page.setViewport({width: 1080, height: 1024})

    page.on('console', (msg) => {
      for (let i = 0; i < msg.args().length; ++i) {
        console.log(`${i}: ${msg.args()[i]}`)
      }
    })

    const data = await page.evaluate(() => {
      const extractedData = { players: []}

      const elements = document.querySelectorAll('.player_name_players_table')

      elements.forEach((element) => {
        const dataSiteId = element.getAttribute('data-site-id')
        const parentDiv = element.parentNode.parentNode

        const basicChildElements = parentDiv.querySelectorAll('a[data-original-title]')
 
        const basicChildValues = []
        basicChildElements.forEach((childElement) => {
          const originalTitle = childElement.getAttribute('data-original-title')

          basicChildValues.push(originalTitle)
        })
        const playerNode = parentDiv.parentNode.parentNode

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
          playerTeam: basicChildValues[0],
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
          playerBaseStats: baseStats
        })
      })

      return extractedData
    })

    console.log('Extracted Data:', data)

    return { done: true }
  } catch (error) {
    console.error('Error occurred:', error)
    return { done: false, error: error.message }
  } finally {
    await browser.close()
  }
}
