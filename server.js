
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
   // {project : 'lion', name : 'alex', startTime : new Date('2016-01-01T12:00:00'), endTime : new Date("2016-01-01T14:37:12")},
];

app.get("/data", function(req, res){
    
	console.log("GET Request to: /");
	res.json(myData);
    
});

app.post("/add", function(req, res){
    
    console.log("POST Request to: /");
    console.log(req.body);
	
	myData.push(req.body);

    // do something with the data that is in the obj. 
    // maybe you could store it in the myData array???
});

app.listen(3000, function(){
	console.log("Listening on port 3000");
});