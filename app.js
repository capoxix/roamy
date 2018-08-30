// import Point from './frontend/src/util/point.js';
const Point = require('./frontend/src/util/point.js');
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


app.get('/test', (req, res) => {
  console.log("hi")
  res.send("hit")
})

app.get(`/directions`, async (req, res) => {
  // make api call using fetch
  // origin will be created based on user input

  const origin = new Point({
    lat: 37.7990,
    lng: -122.4014,
    minutes: 45
  })

  // twin peaks
  // const origin = new Point({lat: 37.751387, lng: -122.446333, minutes: 15})
  
  let searches = 0;
  let searchStr;
  let endPoints;
 
  endPoints = origin.initEndPoints()
  Point.inPacific(endPoints) // check if in pacific ONLY FOR SF

  // while (searches < 4) {
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
