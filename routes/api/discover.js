const express = require('express');
const router = express.Router();
const Point = require('../../frontend/src/util/point.js');
const fetch = require('node-fetch');


router.get('/test', (req, res) => {
  res.send('hi')
})

router.post(`/cars`, async (req, res) => {

  //decode(req.)

  const origin = new Point({
    lat: 37.7990,
    lng: -122.4014,
    minutes: 45
  })
  // twin peaks
  // const origin = new Point({lat: 37.751387, lng: -122.446333, minutes: 15})
  Object.freeze(origin);

  let searches = 0;
  let searchStr, endPoints, text;
 
  endPoints = origin.initEndPoints()
  Point.inPacific(endPoints) // check if in pacific ONLY FOR SF

  while (searches < 4) {
    searches+=1;

    searchStr = origin.makeSearchStr(endPoints);

    promise = await fetch(searchStr);
    text = JSON.parse(await promise.text());

    const addresses = text.destination_addresses;
    const times = text.rows[0].elements;

    origin.adjustPoints(endPoints, times, addresses)
  
  }

  res.send(text);
});

module.exports = router;



// returns a lat lng 
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q

// returns the name
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q