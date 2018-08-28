const axios = require('axios');

export const track = location => {
    return axios.post(`api/locations/track`, location);
};