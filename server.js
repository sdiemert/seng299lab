"use strict";

var express    = require("express");
var bodyParser = require("body-parser");

// The server currently uses an in memory
// data store. You must implement the required
// functionality in ./lib/storage.js and 
// switch out this variable. 
var Storage = require('./lib/MongoDB');
//var Storage = require('./lib/storage');

var app = express();

var db = new Storage(null, null, 'timer');

// use the parse to get JSON objects out of the request. 
app.use(bodyParser.json());

// server static files from the public/ directory.
app.use(express.static('public'));

/**
 * Handle a request for task data.
 */
app.get("/data", function (req, res) {
    console.log("GET Request to: /data");
    
     db.getAllTasks(function(err, data){
         if(err){
            res.status(500).send();
        }else{
            console.log(data)
            res.status(200).json(data);
        } 
     });
    
});

/**
 * Adds a task to the data store.
 */
app.post("/add", function (req, res) {

    console.log("POST Request to: /add");
    
    db.addTask(req.body, function(err){
        if(err){
            res.status(500).send();
        }else{
            res.status(200).send();
        }
    });
    
    res.status(200).send();
});

/**
 * Removes a task from the data store.
 */
app.post("/remove", function (req, res) {
    
    console.log("POST Request to: /remove");
    console.log(req.body);

    db.removeTask(parseInt(req.body.id), function(err){
        if(err){
            res.status(500).send();
        }else{
            res.status(200).send();
        }
    });

});

app.listen(process.env.PORT || 3000, function () {
    
    console.log("Listening on port 3000");
    
    db.connect(function(){
        // some message here....
    });
    
});
