/*
const GiftedChat = require('react-native-gifted-chat');

const axios = require('axios').default;


counter = 1;
random_user_id = Math.floor(Math.random() * 10000000000).toString();


console.log(52);

let list = {};
var instance = axios.create();

instance.post('http://23.21.182.147:8001/text/', {"user_id":this.random_user_id, "count": count.toString(),"text":query},{
    timeout: 10000
}).then(function (response)){
    console.log(response)}
}

// console.log(this.state.maintext);
*/

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
