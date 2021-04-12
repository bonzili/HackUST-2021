var profile = new Object();
profile.name = "Raj";
profile.gender = "M";
profile.age  = 32;
profile.birth_month = 4;
profile.birth_date = 17;
profile.telnum = 12345678;
profile.cloud = false;
var profile_json= JSON.stringify(profile);
console.log(profile_json)

var testing = require('./Profile/profiledata.json')
var read_profile = JSON.parse(profile_json)
console.log(testing["name"])
