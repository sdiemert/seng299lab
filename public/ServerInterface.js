"use strict"
/**
 * Created by sdiemert on 2016-05-25.
 */

class ServerInterface{

    constructor(url, port){
        this._url = url || "localhost"; 
        this._port = port || 3000; 
    }

    /**
     * @param obj {object} the data to send.
     * @param path {string} the server path to make the request to.
     * @param callback {function} called when the server responds.
     *      Takes 1 parameter, an error parameter which is null if everything is OK.
     */
    _sendData(obj, path, callback){

        var u = this._url +":"+ this._port + path;

        console.log("sending POST to "+u);

        var obj = { number : 10};
        var postXhr = new XMLHttpRequest();
        postXhr.open("POST", u, true);
        postXhr.setRequestHeader("Content-type", "application/json");
        postXhr.send(JSON.stringify(obj));

        postXhr.onreadystatechange = function(){

            // this function is executed when the request comes 
            // back from the server. 

            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(null);
            }else if(xhr.readyState == 4 && xhr.status !== 200){
                callback(xhr.status);
            }
        }
    }

    /**
     * Requests time tracker data from the server using a HTTP GET request.
     *
     * @param callback {function} the function to call when the get request comes back.
     *      takes 2 parameters:
     *          1) an error paramenter, will be null if everything was OK.
     *          2) an object that represents the response from the server.
     */
     getData(callback) {
        console.log("sending GET to /data");

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/data", true);
        xhr.send();

        xhr.onreadystatechange = function () {

            // this function is executed when the request comes
            // back from the server.

            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(null, JSON.parse(xhr.responseText));
            }else if(xhr.readyState == 4 && xhr.status !== 200){
                callback(xhr.status, null);
            }
        };
    }

}
