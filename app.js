const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const passport = require('passport');
require('./config/passport')(passport);


const users = require('./routes/api/users');
// const events = require('./routes/api/events');
const locations = require('./routes/api/locations');



mongoose
  .connect(db)
  .then(() => console.log('Sucessfully connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();

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


let lat= 34.069502;
let long= -118.444918;
let minutes = 15;
// let lat= 37.7990;
// let long= -122.4014;
// let minutes = 15;

var resp;

const findLat = () => {

};

app.get(`/directions`, async (request, response) => {
  // make api call using fetch
  let googleMins = 0;
  let searches = 0;
  let difference = minutes*0.005402;
  let scale = 0.005402;

  //
  point = new Point({lat: lat,long: long});

  while(googleMins !== minutes && searches < 4) {
    searches+=1;
    console.log("we are on search #: ", searches);
    console.log("-------------");




    point.lat = lat+difference;



    console.log("Our first long is: ", point.long);
    console.log("-------------");
    resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat}+${long}&destination=${point.lat},%20${long}&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q`);
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




// app.get(`/north`, async (request, response) => {
//   // make api call using fetch
//   let googleMins = 0;
//   let searches = 0;
//   let difference = minutes*0.005402;
//   let scale = 0.005402;
//
//   //
//   point = new Point({lat: lat,long: long});
//
//   while(googleMins !== minutes && searches < 4) {
//     searches+=1;
//     console.log("we are on search #: ", searches);
//     console.log("-------------");


  //initial scale
    point.lat = lat;
    point.long = long + scale*minutes;


  //readjustment scale
    scaleLat = sin(Math.PI *degrees/180)*(minutes* Math.abs(this.lat - lat)/googleMins)
    point.lat = lat+scaleLat;
    scaleLong = cos(Math.PI*degrees/180)*(minutes* Math.abs(this.long - long)/googleMins)
    point.long = long+scaleLong;


//     console.log("Our first long is: ", point.long);
//     console.log("-------------");
//     resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat}+${long}&destination=${point.lat},%20${long}&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q`);
//     // console.log(await response.text());
//     const results = JSON.parse(await resp.text());
//     console.log("Our GoogleMins is currently: ", results.routes[0].legs[0].duration.text.split(" ")[0]);
//
//       googleMins = parseInt(results.routes[0].legs[0].duration.text.split(" ")[0]);
//       if (minutes === googleMins){
//         // endpoints.push(point);
//         // await response.send(point);
//       } else {
//         console.log("our point.long is: ", point.long);
//         console.log("-------------");
//         difference = minutes*(point.lat-lat)/googleMins;
//         console.log("our diff is: ", difference);
//         console.log("-------------");
//       }
//       // console.log("Our googlemins is currently:", googleMins);
//     // });
//   }
//   response.send(point);
// });
//
// app.get(`/south`, async (request, response) => {
//   // make api call using fetch
//   let googleMins = 0;
//   let searches = 0;
//   let difference = minutes*0.005402;
//   let scale = 0.005402;
//
//   //
//   point = new Point({lat: lat,long: long});
//
//   while(googleMins !== minutes && searches < 4) {
//     searches+=1;
//     console.log("we are on search #: ", searches);
//     console.log("-------------");
//     point.lat = lat-difference;
//     console.log("Our first long is: ", point.long);
//     resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat}+${long}&destination=${point.lat},%20${long}&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q`);
//     // console.log(await response.text());
//     const results = JSON.parse(await resp.text());
//     console.log("Our GoogleMins is: ", results.routes[0].legs[0].duration.text.split(" ")[0]);
//
//       googleMins = parseInt(results.routes[0].legs[0].duration.text.split(" ")[0]);
//       if (minutes === googleMins){
//         // endpoints.push(point);
//         // await response.send(point);
//       } else {
//
//         console.log("our point.long is: ", point.long);
//         console.log("-------------");
//         difference = minutes*(Math.abs(long-point.long))/googleMins;
//         console.log("our diff is: ", difference);
//       }
//       // console.log("Our googlemins is currently:", googleMins);
//     // });
//     console.log("-------------");
//   }
//
//   response.send(point);
// });
//
//
//
//
// app.get(`/east`, async (request, response) => {
//   // make api call using fetch
//   let googleMins = 0;
//   let searches = 0;
//   let difference = minutes*0.005402;
//   let scale = 0.005402;
//
//   //
//   point = new Point({lat: lat,long: long});
//
//   while(googleMins !== minutes && searches < 4) {
//     searches+=1;
//     console.log("we are on search #: ", searches);
//     console.log("-------------");
//     point.long = long+difference;
//     console.log("Our first long is: ", point.long);
//     console.log("-------------");
//     resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat}+${long}&destination=${lat},%20${point.long}&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q`);
//     // console.log(await response.text());
//     const results = JSON.parse(await resp.text());
//     console.log("Our GoogleMins is currently: ", results.routes[0].legs[0].duration.text.split(" ")[0]);
//
//       googleMins = parseInt(results.routes[0].legs[0].duration.text.split(" ")[0]);
//       if (minutes === googleMins){
//         // endpoints.push(point);
//         // await response.send(point);
//       } else {
//         console.log("our point.long is: ", point.long);
//         console.log("-------------");
//         difference = minutes*(point.long-long)/googleMins;
//         console.log("our diff is: ", difference);
//         console.log("-------------");
//       }
//       // console.log("Our googlemins is currently:", googleMins);
//     // });
//   }
//   response.send(point);
// });
//
// app.get(`/west`, async (request, response) => {
//   // make api call using fetch
//   let googleMins = 0;
//   let searches = 0;
//   let difference = minutes*0.005402;
//   let scale = 0.005402;
//
//   //
//   point = new Point({lat: lat,long: long});
//
//   while(googleMins !== minutes && searches < 4) {
//     searches+=1;
//     console.log("we are on search #: ", searches);
//     console.log("-------------");
//     point.long = long-difference;
//     console.log("Our first long is: ", point.long);
//     resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${lat}+${long}&destination=${lat},%20${point.long}&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q`);
//     // console.log(await response.text());
//     const results = JSON.parse(await resp.text());
//     console.log("Our GoogleMins is: ", results.routes[0].legs[0].duration.text.split(" ")[0]);
//
//       googleMins = parseInt(results.routes[0].legs[0].duration.text.split(" ")[0]);
//       if (minutes === googleMins){
//         // endpoints.push(point);
//         // await response.send(point);
//       } else {
//
//         console.log("our point.long is: ", point.long);
//         console.log("-------------");
//         difference = minutes*(Math.abs(long-point.long))/googleMins;
//         console.log("our diff is: ", difference);
//       }
//       // console.log("Our googlemins is currently:", googleMins);
//     // });
//     console.log("-------------");
//   }
//
//   response.send(point);
// });


//create route to get single book by its isbn



//Middleware for body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());


app.use('/api/users', users);
// app.use('/api/events', events);
app.use('/api/locations', locations);




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));



// window.results = results;
// console.log(results);
// console.log(results.routes[0].legs[0].end_address);

  // console.log(results.routes[0].legs[0].duration.text.split(" ")[0]);
  // console.log("Our lat is currently:", point.lat);
  // console.log("Our long is currently:", point.long);
  // console.log("Our diff is currently:", difference);
  //
  // point.long = point.long - scale;
  //
  // console.log("Our new long is: ", point.long);
  //
