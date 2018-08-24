const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;


mongoose
  .connect(db)
  .then(() => console.log('Sucessfully connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();


app.get('/', (req, res) => res.send('Hello World!'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
