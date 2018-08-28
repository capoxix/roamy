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

//create route to get single book by its isbn
app.get('/directions/', (request, response) => {
  // make api call using fetch
  fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=San+Francisco&destination=37.799809,%20-122.389125&key=AIzaSyDBghaO6vALAG_-QG2SCBN8LEB_jFM6o1Q`)
  .then((response) => {
      return response.text();
  }).then((body) => {
      let results = JSON.parse(body)
      // console.log(results)   // logs to server
      // console.log(results.routes[0].legs[0].end_address)
      response.send(results) // sends to frontend
    });
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
