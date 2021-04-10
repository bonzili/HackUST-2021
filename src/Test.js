let testing = require('./chart_data.json')
console.log(testing[0]["count"])
console.log(testing[1]["Date"])
var temp = [];
var haha = [{data:temp}];

let i;
var label = [{}];
console.log(typeof label)
for (i = 1; i <= testing[0]["count"]; i++) {
    temp.push(testing[i]["Sentiment_level"])
}

console.log(temp)
console.log(haha)
