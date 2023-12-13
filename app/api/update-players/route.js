import { scrapePlayerData } from "../../../lib/scrape"

export async function POST(request) {
  const data = await scrapePlayerData('https://www.futbin.com/players?page=1')
  
  if (!data.done) {
    return Response.json({ error: data.error })
  }

  return Response.json({ message: 'Scraped data successfully' })
}
