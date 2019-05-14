const axios = require('axios');

module.exports = token => {
  const headers = { 'Authorization': `token ${token}` };
  
  return axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 1000,
    headers,
  });
;}
