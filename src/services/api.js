const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api-backend-blockpim.herokuapp.com',
});

export default api;