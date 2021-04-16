const fetch = require('node-fetch');

function test(result){

    console.log(result)
}

fetch('http://23.21.182.147:8001/text/', {
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_id: 7, count: 5, text: "hi"})
}).then(res => res.json())
    .then(res => test(res));
