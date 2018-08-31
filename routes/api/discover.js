const express = require('express');
const router = express.Router();
const Point = require('../../frontend/src/util/point.js');
const fetch = require('node-fetch');
const NodeGeocoder = require('node-geocoder');


router.get('/test', (req, res) => {
  res.send('hi')
})

router.get(`/car`, async (req, res) => {

  // console.log(req)
  const origin = new Point({
    lat: 37.7990,
    lng: -122.4014,
    minutes: 45
  })
  // twin peaks
  // const origin = new Point({lat: 37.751387, lng: -122.446333, minutes: 15})
  Object.freeze(origin);

  let searches = 0;
  let searchStr, endPoints, duped, text, addresses;
 
  endPoints = origin.initEndPoints()
  Point.inPacific(endPoints) // check if in pacific ONLY FOR SF
  duped = endPoints.slice();

  while (searches < 4) {
    searches+=1;

    searchStr = origin.makeSearchStr(duped);

    promise = await fetch(searchStr);
    text = JSON.parse(await promise.text());

    addresses = text.destination_addresses;
    const times = text.rows[0].elements;

    origin.adjustPoints(duped, times, addresses)
    duped = Point.modify(duped);
  }

  res.send(text);
});

function modify(endPoints) {
  activePoints = [];
  
  for(let i = 0; i < endPoints.length; i++) {
    if (endPoints[i].static === false) {activePoints.push(endPoints[i])}
  }
  console.log('before', endPoints)
  console.log('after', activePoints)
  return activePoints;
}

module.exports = router;



// returns a lat lng 
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q

// returns the name
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q