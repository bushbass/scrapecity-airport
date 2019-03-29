import axios from "axios";
import cheerio from "cheerio";

async function getHTML(url) {
  const { data: html } = await axios.get(
    "https://www.airport-ewr.com/newark-arrivals"
  );
  return html;
}
async function getArrivalTimes(html) {
  const $ = cheerio.load(html);
  const flight = $("#fdest a");
  const flightArray = [];
  const time = $('[id="flight_detail_junt2"] [id="fhour"] a').each(
    (i, element) => {
      flightArray.push(element.children[0].data);
    }
  );
  const singledFlightArray = new Set(flightArray);
  console.log(Array.from(singledFlightArray));
  // console.log(time);

  // console.log(time[1].children[0].children[0].children[0].data);
}
export { getHTML, getArrivalTimes };

// $('li').each(function(i, elem) {
//   fruits[i] = $(this).text();
// });
// let arraySet1 = new Set([3,2,1]);
