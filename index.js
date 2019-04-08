import { getHTML, getArrivalTimes } from './lib/scraper';
import express from 'express';
import db from './lib/db';

const app = express();

app.get('/', async (req, res, next) => {
  console.log('scraping');

  const countObject = await getArrivalTimes(
    await getHTML('https://www.airport-ewr.com/newark-arrivals')
  );
  db.get('countObject')
    .push({ date: Date.now(), countObject })
    .write();

  var html = '';

  for (var hour in countObject) {
    html += `<p>${Number(hour)} o'clock to ${Number(hour) + 1} o'clock - ${
      countObject[hour]
    } flights</p>`;
  }
  res.send(html);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app running on ${port}`));
