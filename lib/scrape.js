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

        extractedData.players.push({
          playerItemId: dataSiteId,
          playerName: element.textContent.trim(),
          playerTeam: basicChildValues[0],
          playerNation: basicChildValues[1],
          playerLeague: basicChildValues[2]
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
