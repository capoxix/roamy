// const fetch = require('node-fetch');
const axios = require('axios');

export const test = user => {
    axios.get(`/api/events/test`)
    .then((response) => {
        return response.text();
    }).then((body) => {
        let results = JSON.parse(body)
        console.log(results)   // logs to server
        // response.send(results) // sends to frontend
      });
};

