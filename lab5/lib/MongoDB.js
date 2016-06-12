"use strict";
/**
 * Created by sdiemert on 2016-05-25.
 */

// See https://github.com/mongodb/node-mongodb-native for details.
var MongoClient = require("mongodb").MongoClient;
var DBAdapter   = require("./DBAdapter");


class MongoDB extends DBAdapter {

    constructor(u, p, db, host, port) {
        super(u, p, db, host, port);

        this._user   = u;
        this._passwd = p;
        this._dbname = db;
        this._host   = host || "localhost";
        this._port   = port || 27017;

        this._db = null;

    }

    /**
     * Connects to the database.
     * @param callback {function} called when the connection completes.
     *      Takes an error parameter.
     */
    connect(callback) {
        
        var that = this; 

        MongoClient.connect(
            "mongodb://" + this._host + ":" + this._port + "/" + this._dbname,
            function (err, db) {

                if (err) {
                    console.log("ERROR: Could not connect to database.");
                    that._db = null;
                    callback(err);
                } else {
                    console.log("INFO: Connected to database.");
                    that._db = db;
                    callback(null);
                }

            }
        );

    }

    /**
     * Closes the connection to the database.
     */
    close() {
        this._db.close();
    }

    /**
     * Queries the database for all tasks and returns them via the callback
     * function.
     *
     * @param callback {function} called when query finishes.
     *      Takes two parameters: 1) error parameter, 2) data returned from query.
     */
    getAllTasks(callback) {

        var collection = this._db.collection("tasks");

        collection.find({}).toArray(function(err, data){
            if(err){
                callback(err, null);
            }else{
                callback(null, data);
            }
        });

    }

    /**
     * Adds a task to the database.
     *
     * @param task {object} represents the task to be added to the DB.
     * @param callback {function} called when query finishes.
     *      Takes a single error parameter.
     */
    addTask(task, callback) {

        task.id = (new Date()).getTime(); 
        var collection = this._db.collection("tasks");
        collection.insertOne(task, function(err, result){
            if(err) callback(err);
            else callback(null);
        });

    }

    /**
     * Remove a task from the database.
     *
     * @param id {number} id of object to remove.
     * @param callback {function} called when remove is completed.
     */
    removeTask(id, callback) {

        var collection = this._db.collection("tasks");

        collection.deleteOne({id : id}, function(err, data){
            if(err || data.length !== 0) callback(err, null);
            else callback(null, data[0]);
        });

    }

}

module.exports = MongoDB; 
