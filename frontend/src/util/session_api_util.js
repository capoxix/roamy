// const fetch = require('node-fetch');
const axios = require('axios');

//{email: 'garbocheng93@gmail.com', password: '123456'}
export const login = user => {
    return axios.post(`/api/users/login`, user)
    // .then((response) => {
    //     // console.log(response);
    //     console.log(response.data);
    //     // return response.data;
    // });
};
// {name: 'testing', email: 'testing1@gmail.com', password:'123456', password2: '123456'}
export const register = user => {
    return axios.post(`/api/users/register`, user)
    // .then((response) => {
    //     console.log(response.data);
    // });
};

export const currentSession = () => {
    return axios.get(`/api/users/current`)
    // .then((response) => {
    //     console.log(response.data);
    // });
};

