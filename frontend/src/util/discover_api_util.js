const axios = require('axios');

export const discoverCar = query => {
  return axios.get('api/discover/car', query);
};