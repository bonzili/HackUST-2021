console.log(Math.floor(Math.random() * 10000000000).toString());
const axios = require('axios').default;
axios.post('http://23.21.182.147:8001/text/', {"user_id":"matthew", "count":"1","text":"I feel very happy because I can travel"})
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  