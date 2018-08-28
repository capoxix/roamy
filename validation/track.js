const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTrackInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name: '';
  data.lat = !isEmpty(data.lat) ? data.lat : '';
  data.lng = !isEmpty(data.lng) ? data.lng : '';


  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.lat)) {
    errors.lat= 'Latitude field is required';
  }

  if (Validator.isEmpty(data.lng)) {
    errors.lng= 'Longitude field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};