import axios from "axios";
import cheerio from "cheerio";

// just gets html from page via axios
async function getHTML(url) {
  const { data: html } = await axios.get(
    "https://www.airport-ewr.com/newark-arrivals"
  );
  return html;
}

// takes the html from getHTML function and manipulates it to produce our object
async function getArrivalTimes(html) {
  const $ = cheerio.load(html);

  // get flight times from cheerio object and save them to flightArray
  const flightArray = [];
  const time = $('[id="flight_detail_junt2"] [id="fhour"] a').each(
    (i, element) => {
      flightArray.push(element.children[0].data);
    }
  );

  //remove duplicate times by making it a set
  // const singledFlightArray = new Set(flightArray);

  //convert  de-duplicated set back to array
  // const arraySingledFlightArray = Array.from(singledFlightArray);

  // combined previous 2 statements into one es6 statment
  // remove duplicate times
  const arraySingledFlightArray = [...new Set(flightArray)];

  // convert to 24 hour time and return only the hour
  // I'm assuming the times are all the same day so that date is arbitrary
  const flightArrayRemovedMinutes = arraySingledFlightArray.map(item =>
    new Date(`6/11/1970 ${item}`).getHours()
  );

  //get count of each hour and save the count to an object
  const countObj = {};
  for (let i = 0; i < flightArrayRemovedMinutes.length; i++) {
    !countObj[flightArrayRemovedMinutes[i]]
      ? (countObj[flightArrayRemovedMinutes[i]] = 1)
      : countObj[flightArrayRemovedMinutes[i]]++;
  }
  return countObj;
}
export { getHTML, getArrivalTimes };

// console.log(time[1].children[0].children[0].children[0].data);
// https://stackoverflow.com/questions/15083548/convert-12-hour-hhmm-am-pm-to-24-hour-hhmm
