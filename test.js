var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.open("POST", 'https://dialogflow.googleapis.com/v2/projects/grandpa-spsw/agent/sessions/1:detectIntent', true);



xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log(xhr.responseText);
    }
}

const x = {
    "query_input": {
      "text": {
        "text": "I know french",
        "language_code": "en-US"
      }
    }
  };
xhr.send(x);
