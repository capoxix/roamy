const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const events = require('./routes/api/events');

mongoose
  .connect(db)
  .then(() => console.log('Sucessfully connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();


app.get('/', (req, res) => res.send('Hello World!'));


//Middleware for body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/events', events);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
