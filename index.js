import { getHTML, getArrivalTimes } from "./lib/scraper";

async function go() {
  getArrivalTimes(await getHTML("https://www.airport-ewr.com/newark-arrivals"));
}

go();
