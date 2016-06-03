
/**
 * Requests a new board state from the server's /data route.
 * 
 * @param cb {function} callback to call when the request comes back from the server.
 */
function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

        // handle any errors here....

        // draw the board....
        cb(data);  

    }); 
}

/**
 * Draws the board to the #canvas element on the page. 
 *
 * @param state {object} - an object representing the state of the board.  
 */ 
function drawBoard(state){
    console.log(state);

    var canvas = $("#canvas"); 

    var svg = 

}

function init(){
    // do page load things here...
    console.log("Initalizing Page...."); 
    getData(drawBoard); 
}
