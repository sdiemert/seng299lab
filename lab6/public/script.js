
var boardState = null; 

/**
 * Requests a new board state from the server's /data route.
 * 
 * @param cb {function} callback to call when the request comes back from the server.
 */
function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  
        console.log(data);

        // handle any errors here....

        // draw the board....

        boardState = data; 

        cb(data);  

    }); 
}

/**
 * Draws the board to the #canvas element on the page. 
 *
 * You may find the following links helpful: 
 *  - https://api.jquery.com/
 *  - https://api.jquery.com/append/
 *  - http://www.tutorialspoint.com/jquery/
 *  - http://www.w3schools.com/jquery/ 
 *
 * @param state {object} - an object representing the state of the board.  
 */ 
function drawBoard(state){

    var canvas = $("#canvas");

    canvas.html("") 

    // Change the height and width of the board here...
    // everything else should adapt to an adjustable
    // height and width.
    var W = 600, H = 600; 
    canvas.css("height", H); 
    canvas.css("width", W); 

    // The actual SVG element to add to. 
    // we make a jQuery object out of this, so that 
    // we can manipulate it via calls to the jQuery API. 
    var svg = $(makeSVG(W, H));

    var RAD = 0.8*(W/state.size/2); 
    var MARG = RAD+10;
    var V_SPACE = (W-MARG*2) / state.size; 
    var H_SPACE = (H-MARG*2) / state.size; 
    
     

    for(var i = 0; i < state.size; i++){
        svg.append(makeLine(MARG+i*V_SPACE, MARG, MARG+(i*V_SPACE), H-V_SPACE-MARG, "black", 2))
        svg.append(makeLine(MARG, MARG+i*H_SPACE, W-H_SPACE-MARG, MARG+i*H_SPACE, "black", 2))
    }

    for(var i = 0; i < state.size; i++){
        for(var j = 0; j < state.size; j++){
            
            if(state.board[i][j] == 1){
                svg.append(makeCircle(MARG+i*V_SPACE, MARG+j*H_SPACE, RAD, "black"));
            }else if(state.board[i][j] == 2){
                svg.append(makeCircle(MARG+i*V_SPACE, MARG+j*H_SPACE, RAD, "white"));
            }

        }
    }

    // append the svg object to the canvas object.
    canvas.append(svg);

}

function getMove(){

    $.ajax({
        type: 'POST',
        url : '/move',
        dataType: "json",
        data : JSON.stringify(boardState), 
        contentType : "application/json",
        success : function(data){
            console.log(data);
            console.log(status);
            boardState = data;
            drawBoard(data);    
        }
    });

}

function init(){

    // do page load things here...

    console.log("Initalizing Page...."); 
    getData(drawBoard); 
}
