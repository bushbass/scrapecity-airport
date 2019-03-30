import axios from 'axios';
import cheerio from 'cheerio';

async function getHTML(url) {
  const { data: html } = await axios.get(
    'https://www.airport-ewr.com/newark-arrivals'
  );
  return html;
}
async function getArrivalTimes(html) {
  const $ = cheerio.load(html);
  const flightArray = [];
  const time = $('[id="flight_detail_junt2"] [id="fhour"] a').each(
    (i, element) => {
      flightArray.push(element.children[0].data);
    }
  );
  //remove duplicate times
  const singledFlightArray = new Set(flightArray);

  //convert set to array
  const arraySingledFlightArray = Array.from(singledFlightArray);

  //remove am/pm and minutes to leave just hour
  const flightArrayRemovedMinutes = arraySingledFlightArray.map(item =>
    item.slice(0, -6)
  );

  //get count of each hour
  const countObj = {};
  for (let i = 0; i < flightArrayRemovedMinutes.length; i++) {
    !countObj[flightArrayRemovedMinutes[i]]
      ? (countObj[flightArrayRemovedMinutes[i]] = 1)
      : countObj[flightArrayRemovedMinutes[i]]++;
  }
  console.log(countObj);
}
export { getHTML, getArrivalTimes };

// console.log(time[1].children[0].children[0].children[0].data);
// https://stackoverflow.com/questions/15083548/convert-12-hour-hhmm-am-pm-to-24-hour-hhmm
