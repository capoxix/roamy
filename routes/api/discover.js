const express = require('express');
const router = express.Router();
const Point = require('../../frontend/src/util/point.js');
const fetch = require('node-fetch');
const NodeGeocoder = require('node-geocoder');

router.post(`/car`, async (req, res) => {
  const origin = new Point({
    lat: req.body.lat,
    lng: req.body.lng,
    minutes: parseInt(req.body.minutes)
  })
  // twin peaks
  // const origin = new Point({lat: 37.751387, lng: -122.446333, minutes: 15})
  Object.freeze(origin);

  let searches = 0;
  let searchStr, endPoints, duped, text, addresses, results;

  endPoints = origin.initEndPoints()
  origin.endPointsInWater(endPoints) // check if ENDPOINTS IN PACIFIC OR NEAR ANGEL
  duped = endPoints.slice();

  while (searches < 3) {
    searches+=1;

    searchStr = origin.makeSearchStr(duped);

    promise = await fetch(searchStr);
    text = JSON.parse(await promise.text());

    addresses = text.destination_addresses;
    const times = text.rows[0].elements;

    origin.adjustPoints(duped, times, addresses)
    duped = Point.modify(duped);
  }

  results = await curryPoints(endPoints, origin).then((res1) => {
    console.log(res1)
    results = res1
    res.send(results);
  })
});

async function curryPoints(endPoints, origin) {
  const results = [];

  const options = {
    provider: 'google',
    apiKey: 'AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q'
  }
  const geocoder = NodeGeocoder(options)

  for (let i = 0 ; i <  endPoints.length; i++) {
    // && (origin.minutes + 2.5) < endPoints[i].minutes
    if (!endPoints[i].destroy && (origin.minutes + 2.5) > endPoints[i].minutes) {
      results.push(endPoints[i])
      await fixLatLng(endPoints[i], geocoder)
    }
  }

  return results
};

async function fixLatLng(point, geocoder) {

  const promise = await geocoder.geocode(point.address)
    console.log(promise[0].latitude)
    console.log(promise[0].longitude)
    // if point difference is too big, just keep original points
    // if (Math.abs(point.lat - promise[0].latitude)
    point.lat = promise[0].latitude
    point.lng = promise[0].longitude
}


// geocoder.geocode(point.address)
// .then((res) => {
//   point.lat = res[0].latitude
//   point.lng = res[0].longitude

//   console.log("Point------")
//   console.log(counter.count)
//   counter.count += 1;
//   console.log(counter.count)

//   console.log(point.address)
//   console.log(point.angle)
//   console.log(point.lat)
//   console.log(point.lng)
//   console.log("----------------")
//   console.log("-")
//   // console.log(res[0])
// })

module.exports = router;



// returns a lat lng
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q

// returns the name
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q
