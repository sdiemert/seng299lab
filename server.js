
// File: express-server-static.js

// Example from: http://expressjs.com/en/starter/hello-world.html
// static file serving: http://expressjs.com/en/starter/static-files.html

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// use the parse to get JSON objects out of the request. 
app.use(bodyParser.json());

// server static files from the public/ directory.
app.use(express.static('public'));

var myData = [
    {animal : 'lion', name : 'alex'},
    {animal : 'hippo', name : 'gloria'},
    {animal : 'giraffe', name : 'melmen'},
    {animal : 'zebra', name : 'marty'},
];

app.get("/data", function(req, res){
	console.log("GET Request to: /");
	res.json(myData);
});

app.post("/data", function(req, res){
    console.log("POST Request to: /");
    console.log(req.body);

    // do something with the data that is in the obj. 
    // maybe you could store it in the myData array???
});

app.listen(3000, function(){
	console.log("Listening on port 3000");
});