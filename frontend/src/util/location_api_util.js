const axios = require('axios');

export const track = (location) => {
    return axios.post(`api/locations/track`, location);
};

export const getFavorites = (userId) => {
    return axios.get(`api/locations/favorites/${userId}`);
};