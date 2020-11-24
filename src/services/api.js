const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api-node-blockpim.herokuapp.com/',
});

export default api;
