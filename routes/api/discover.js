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
  origin.endPointsInWater(endPoints) // check if ENDPOINTS IN PACIFIC OR NEAR ANGEL ISLAND
  duped = endPoints.slice();

  while (searches < 3) {
    searches+=1;
    searchStr = origin.makeSearchStr(duped);

    try {
      promise = await fetch(searchStr);
    } catch (errors) {
      res.send(errors)
    }

    try {
      text = JSON.parse(await promise.text());
    } catch (errors) {
      res.send(errors)
    }

    addresses = text.destination_addresses;
    const times = text.rows[0].elements;

    origin.adjustPoints(duped, times, addresses)
    duped = Point.modify(duped);
  }

  results = selectPoints(endPoints, origin)

  
  geolocate(results, (response) => res.send(response))
});

function geolocate(endPoints, cb) {
  let counter = 0;
  for (i = 0; i < endPoints.length; i++) {
    (function iife(j) {
      const point = endPoints[j]
      convertAddress(point).then( (response) => {
        counter += 1;
        const dLat = 0.003604 * 4;
        const dLng =  0.0045402 * 4;
        const { latitude, longitude} = response[0];

        if (Math.abs(point.lat - latitude) < dLat && Math.abs(point.lng - longitude) < dLng) {
          endPoints[j].lat = latitude;
          endPoints[j].lng = longitude;

        }
        // console.log(latitude)
        // console.log(longitude)
        // console.log(endPoints[j])
        // console.log(counter, j)
  
        if (counter === endPoints.length) {
  
          cb(endPoints)
        }
      }, (reject) => {
        counter += 1
        if (counter === 15) {
  
          cb(endPoints)
        }
      })

    })(i)
  }

}

function convertAddress(point) {
  const options = {
    provider: 'google',
    apiKey: 'AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q'
  }
  const geocoder = NodeGeocoder(options)
  return geocoder.geocode(point.address)
}

//

function selectPoints(endPoints, origin) {
  const results = [];
  for (let i = 0 ; i <  endPoints.length; i++) {
    if (!endPoints[i].destroy && (origin.minutes + 2.5) > endPoints[i].minutes) {
      if (endPoints[i].lat && endPoints[i].lng && endPoints[i].minutes && endPoints[i].address) {
        results.push(endPoints[i])     
      }
    }
  }
  return results
};




async function fixLatLng(point) {
  const dLat200m = 0.003604 * 0.5;
  const dLng200m =  0.0045402 * 0.5;

  const promise = geocoder.geocode(point.address)

    if (!promise[0].latitude || !promise[0].longitude) { return }

    if (Math.abs(point.lat - promise[0].latitude) > dLat200m || Math.abs(point.lng - promise[0].longitude) > dLng200m) {
      
      point.lat = promise[0].latitude
      point.lng = promise[0].longitude
    }
}

module.exports = router;



// returns a lat lng
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q

// returns the name
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q
