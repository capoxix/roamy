// const Point = require('./frontend/src/util/point.js');
const express = require('express');
const mongoose = require('mongoose');
let db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const passport = require('passport');
require('./config/passport')(passport);

const path = require('path');

const users = require('./routes/api/users');
const locations = require('./routes/api/locations');
const discover = require('./routes/api/discover');

if(process.env.NODE_ENV === 'production') {
  db = require('./config/keys_prod').mongoURI; 
}

mongoose
  .connect(db)
  .then(() => console.log('Sucessfully connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();


// app.get('/test', (req, res) => {
//   console.log("hi")
//   res.send("hit")
// })


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

//Middleware for body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());


app.use('/api/users', users);
app.use('/api/locations', locations);
app.use('/api/discover', discover)




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
