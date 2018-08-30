const express = require('express');
const app = express();

let endpoints = []

let difference = minutes * 0.005402;

class Point {
  constructor({lat, long}){
    this.lat = lat;
    this.long = long;
  }

  this.draw = false;
  // this.distance = distance;
  // this.time= time;
}

let point;

// export const generate_endpoints(lat,long,minutes) => {
  app.get(`/search`, (request, response) => {
    // make api call using fetch
    let googleMins = 0;
    //

    while(googleMins !== minutes) {
      point = new Point ({lat, long+difference})
      fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat}+${long}&destination=${point.lat},%20${point.long}&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q`)
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        let results = JSON.parse(body)
        // console.log(results)   // logs to server
        // console.log(results.routes[0].legs[0].end_address)
        console.log(results.routes[0].legs[0].duration.text.split(" ")[0]);
        googleMins = parseInt(results.routes[0].legs[0].duration.text.split(" ")[0]);
        if (minutes === googleMins){
          // endpoints.push(point);
          response.send(point);
        } else {
          difference = minutes*(point.long-long)/googleMins;
        }
      });
    });
  // }


  //fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=San+Francisco&destination=37.799809,%20-122.389125&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q`)
