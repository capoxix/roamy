const express = require('express');
const router = express.Router();
const Location = require('../../models/Location');
const fetch = require('node-fetch');
const passport = require('passport');


const validateTrackInput = require('../../validation/track.js');

/* track favorite location for logged in user*/
router.post('/track', (req,res) => {

    const{ errors, isValid } = validateTrackInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const location = new Location({
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng,
        userId: req.body.userId
    });

    location.save()
        .then(location => res.json(location))
        .catch(err => console.log(err));

});

router.post('/favorites', (req, res) => {
  Location.find({userId: req.body.userId})
    .then(favorites => res.json(favorites))
    .catch(err => console.log(err));
});

let lat= 34.069502;
let long= -118.444918;
let minutes = 15;

router.get(`/north`, async (request, response) => {
  // make api call using fetch
  let googleMins = 0;
  let searches = 0;
  let difference = minutes*0.005402;
  let scale = 0.005402;

  //

  class Point {
    constructor({lat, long}){
      this.lat = lat;
      this.long = long;
      this.draw = false;
    }
  
    // this.distance = distance;
    // this.time= time;
  }
  
  let point;

  point = new Point({lat: lat,long: long});

  while(googleMins !== minutes && searches < 4) {
    searches+=1;
    console.log("we are on search #: ", searches);
    console.log("-------------");
    point.lat = lat+difference;
    console.log("Our first long is: ", point.long);
    console.log("-------------");
    resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat}+${long}&destination=${point.lat},%20${long}&key=AIzaSyA3tKBZcqJXXbGnAGoph4_a1WEZ_QZK7-E`);
    // console.log(await response.text());
    const results = JSON.parse(await resp.text());
    console.log("Our GoogleMins is currently: ", results.routes[0].legs[0].duration.text.split(" ")[0]);

      googleMins = parseInt(results.routes[0].legs[0].duration.text.split(" ")[0]);
      if (minutes === googleMins){
        // endpoints.push(point);
        // await response.send(point);
      } else {
        console.log("our point.long is: ", point.long);
        console.log("-------------");
        difference = minutes*(point.lat-lat)/googleMins;
        console.log("our diff is: ", difference);
        console.log("-------------");
      }
      // console.log("Our googlemins is currently:", googleMins);
    // });
  }
  response.send(point);
});


module.exports = router;
