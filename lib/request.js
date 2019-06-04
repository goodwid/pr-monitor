const axios = require('axios');

module.exports = token => {
  const headers = { 'Authorization': `token ${token}` };
  
  return axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 3000,
    headers,
  });
};
