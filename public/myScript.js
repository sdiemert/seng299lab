
// FILE: public/myScript.js 


var xhr = new XMLHttpRequest(); 
xhr.open("GET", "/data", true);
xhr.send(); 

xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        // we got a response! 
        console.log(xhr.responseText);
        document.getElementById("response").innerHTML = xhr.responseText;
    }
};

function sendData(){
    console.log("sending POST to /data");
    var obj = { number : 10};
    var postXhr = new XMLHttpRequest(); 
    postXhr.open("POST", "/data", true);
    postXhr.setRequestHeader("Content-type", "application/json");
    postXhr.send(JSON.stringify(obj));
}