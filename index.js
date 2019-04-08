import { getHTML, getArrivalTimes } from "./lib/scraper";
import express from 'express'

const app = express()

app.get('/scrape', async (req,res,next)=>{
    console.log('scraping')
   
  const countObject = await getArrivalTimes(await getHTML("https://www.airport-ewr.com/newark-arrivals"));
  
//   console.log(countObject)

})


// async function go() {
//   const countObject = await getArrivalTimes(await getHTML("https://www.airport-ewr.com/newark-arrivals"));
//   return countObject
// }

app.listen (process.env.PORT, ()=> console.log(`app running on ${process.env.PORT}`))