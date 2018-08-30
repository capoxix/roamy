const express = require('express');
const router = express.Router();
const Point = require('../../frontend/src/util/point.js');
const fetch = require('node-fetch');



router.get(`/cars`, async (req, res) => {
  // make api call using fetch
  // origin will be created based on user input

  const origin = new Point({
    lat: 37.7990,
    lng: -122.4014,
    minutes: 10
  })

  // twin peaks
  // const origin = new Point({lat: 37.751387, lng: -122.446333, minutes: 15})
  
  let searches = 0;
  let searchStr;
  let endPoints;
 
  endPoints = origin.initEndPoints()
  Point.inPacific(endPoints) // check if in pacific ONLY FOR SF

  // while (searches < 4 && requireReadjust) {
    searches+=1;

    searchStr = origin.makeSearchStr(endPoints);
    // console.log(searchStr)
    promise = await fetch(searchStr);

    const text = JSON.parse(await promise.text());

    const addresses = text.destination_addresses;
    const times = text.rows[0].elements;
    console.log('t')
    console.log('t')
    console.log('t')
    console.log('t')
    console.log('t')
    console.log('t')
    console.log(text)
    // origin.adjustPoints(endPoints, times, addresses)
  
  // }
  res.send(text);
});

module.exports = router;