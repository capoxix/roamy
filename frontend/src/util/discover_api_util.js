const axios = require('axios');

export const discover_car = query => {
  return axios.post('api/discover/car', query);
};