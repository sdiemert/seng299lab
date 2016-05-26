// FILE: public/myScript.js

//keep track of the current timer task.
var currentTask = null;

/**
 * Starts the timer for the current task.
 */
function startTimer(){

    var name = document.getElementById("task-name").value;
    var proj = document.getElementById("project").value;
    
    if(!name || !proj){
        
        console.log("No task or project!");
        alert("Please enter a task and a project!");
        
    }else{
        
        currentTask = {}; 
        currentTask.name = name; 
        currentTask.project = project; 
        currentTask.startTime = new Date(); 
        currentTask.endTime = null; 
        
        document.getElementById("start-button").disabled = true;
        document.getElementById("stop-button").disabled = false;

        timerLoop();

    }

}

/**
 * Shows the current timer ticking.
 */
function timerLoop(){
    setTimeout(function(){
       if(currentTask){
           var d = new Date(); 
           var secs = Math.floor((d - currentTask.startTime)/1000);
           var mins = Math.floor(secs/60);
           var s = (mins >= 10) ? mins+":" : "0"+mins+":";
           s += (secs%60 >= 10) ? secs%60 : "0"+secs%60;
           document.getElementById("timer-time").innerHTML = s;
           
           timerLoop()
       }
    }, 1000);
}

function stopTimer(){

    document.getElementById("start-button").disabled = false;
    currentTask = null;

}

function rebuildTable(object){

    

}


