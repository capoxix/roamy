const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model("locations", LocationSchema);