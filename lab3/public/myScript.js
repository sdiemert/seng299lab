// FILE: public/myScript.js

//keep track of the current timer task.
var currentTask = null;

// create a new object for accessing the server

var serverInterface = new ServerInterface("localhost", 3000);

/**
 * Starts the timer for the current task.
 */
function startTimer() {

    var name = document.getElementById("task-name").value;
    var proj = document.getElementById("project").value;

    if (!name || !proj) {

        console.log("No task or project!");
        alert("Please enter a task and a project!");

    } else {

        currentTask           = {};
        currentTask.name      = name;
        currentTask.project   = proj;
        currentTask.startTime = new Date();
        currentTask.endTime   = null;

        document.getElementById("start-button").disabled = true;
        document.getElementById("stop-button").disabled  = false;

        timerLoop();

    }

}

/**
 * Shows the current timer ticking.
 */
function timerLoop() {
    setTimeout(function () {
        if (currentTask) {
            document.getElementById("timer-time").innerHTML = makeTimeDiff(currentTask.startTime, new Date());
            timerLoop()
        }
    }, 1000);
}

function stopTimer() {

    currentTask.endTime = new Date();

    serverInterface.addTask(
        currentTask.name,
        currentTask.project,
        currentTask.startTime,
        currentTask.endTime,
        function (data) {
            serverInterface.getData(function (err, data) {
                if (err) {
                    console.log("Error getting data: " + err);
                } else {
                    rebuildTable(data);
                }
            });
        }
    );

    document.getElementById("start-button").disabled = false;
    document.getElementById("stop-button").disabled = true;
    document.getElementById("timer-time").innerHTML  = "";
    document.getElementById("task-name").value = "";
    document.getElementById("project").value = "";

    currentTask = null;
}

function rebuildTable(objects) {

    var t = document.getElementById("table-body");

    //first delete the old table (if it exists).
    t.innerHTML = "";

    var r, cName, cProject, cStart, cEnd, cTime, dC;
    var sTime, eTime, diff;
    var delBtn;

    // Now go through and rebuild the table.
    for (var i = 0; i < objects.length; i++) {

        delBtn           = document.createElement("button");
        delBtn.innerHTML = "Delete";
        delBtn.setAttribute("task-id", objects[i].id);

        delBtn.onclick = function () {
            serverInterface.removeTask(this.getAttribute('task-id'), function (err) {
                serverInterface.getData(function (err, data) {
                    rebuildTable(data);
                });
            });
        };

        r = t.insertRow(i);

        r.setAttribute("task-id", objects[i].id);

        cName    = r.insertCell(0);
        cProject = r.insertCell(1);
        cStart   = r.insertCell(2);
        cEnd     = r.insertCell(3);
        cTime    = r.insertCell(4);

        r.insertCell(5).appendChild(delBtn);

        sTime = new Date(objects[i].startTime);
        eTime = new Date(objects[i].endTime);

        diff = Math.floor((eTime - sTime) / 1000);

        cName.innerHTML    = objects[i].name;
        cProject.innerHTML = objects[i].project;
        cStart.innerHTML   = makeDateTime(sTime);
        cEnd.innerHTML     = makeDateTime(eTime);
        cTime.innerHTML    = makeTimeDiff(sTime, eTime);

    }

}

function makeDateTime(d) {
    return makeDateString(d) + " " + makeTimeString(d);
}

function makeDateString(d) {
    var s = "";
    s += d.getFullYear() + "-";
    s += (((d.getMonth() + 1) > 9) ? (d.getMonth() + 1) : ("0" + (d.getMonth() + 1))) + "-";
    s += (((d.getDate()) > 9) ? ((d.getDate())) : ("0" + (d.getDate())));
    return s;
}

function makeTimeString(d) {
    var s = "";
    s += ((d.getHours() > 9) ? (d.getHours()) : ("0" + d.getHours())) + ":";
    s += ((d.getMinutes() > 9) ? (d.getMinutes()) : ("0" + d.getMinutes())) + ":";
    s += ((d.getSeconds() > 9) ? (d.getSeconds()) : ("0" + d.getSeconds()));
    return s;
}

function makeTimeDiff(d1, d2) {

    var secs  = Math.floor((d2 - d1) / 1000);
    var mins  = Math.floor(secs / 60);
    var hours = Math.floor(mins / 60);

    var s = "";
    s += (hours >= 10) ? hours + ":" : "0" + hours + ":";
    s += (mins % 60 >= 10) ? mins % 60 + ":" : "0" + mins % 60 + ":";
    s += (secs % 60 >= 10) ? secs % 60 : "0" + secs % 60;

    return s;


}

/**
 * Initializer function, called on refresh of page.
 */
function init() {

    console.log("Initializing timer application....");

    serverInterface.getData(function (err, data) {

        if (err) {
            console.log("ERROR getting data: " + err);
            alert("Could not get data from server: " + err);
        } else {
            console.log(data);
            rebuildTable(data);
        }

    });

}

init(); 

