const axios = require('axios');

export const discoverCar = query => {
  return axios.post('api/discover/car', query);
};