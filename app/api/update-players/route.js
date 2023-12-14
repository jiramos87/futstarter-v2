import fs from 'fs'

import { scrapePlayerData } from "../../../lib/scrape"

export async function POST(request) {
  const response = await scrapePlayerData('https://www.futbin.com/players?page=1')
  fs.writeFileSync('players.json', JSON.stringify(response.players, null, 2))

  if (!response.done) {
    return Response.json({ error: response.error })
  }

  return Response.json({ message: 'Scraped data successfully' })
}
