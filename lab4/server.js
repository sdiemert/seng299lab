"use strict";

var express    = require("express");

var app = express();

// server static files from the public/ directory.
app.use(express.static('public'));

function generateBoard(){

    var state = {
        size : 0, 
        board  : [],
    }

    var max = 19;
    var min = 5;

    while(state.size % 2 !== 1){
        state.size = Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    var tmp = []; 
    for(var i = 0; i < state.size; i++){
        tmp = []; 
        for(var j = 0; j < state.size; j++){
            tmp.push(Math.floor(Math.random()*(2 - 0 + 1))); 
        }
        state.board.push(tmp);
    }

    return state; 

}



/**
 * Handle a request for task data.
 */
app.get("/data", function (req, res) {
    console.log("GET Request to: /data");
    res.json(generateBoard()); 
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
});
