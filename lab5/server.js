"use strict";

var express    = require("express");
var bodyParser = require("body-parser");

var Storage = require('./lib/MongoDB');

// run server with: PORT=XXXXX node server.js 
// to have it bind to a port from the cmd line.
// or change the port number here...
var port = process.env.PORT || 3000;

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


app.listen(port, function () {
    
    console.log("Listening on port "+port);
    
    db.connect(function(){
        // some message here....
    });
    
});
