import { getHTML, getArrivalTimes } from "./lib/scraper";
import express from "express";

const app = express();

app.get("/scrape", async (req, res, next) => {
  console.log("scraping");

  const countObject = await getArrivalTimes(
    await getHTML("https://www.airport-ewr.com/newark-arrivals")
  );
  res.json(countObject);

  //   console.log(countObject)
});

// async function go() {
//   const countObject = await getArrivalTimes(await getHTML("https://www.airport-ewr.com/newark-arrivals"));
//   return countObject
// }
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app running on ${port}`));
