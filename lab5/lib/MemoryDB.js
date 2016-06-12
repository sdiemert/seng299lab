"use strict";
/**
 * This class stores the data in the server's
 * memory!
 *
 * Created by sdiemert on 2016-05-25.
 */

var DBAdapter   = require("./DBAdapter");

class MemoryDB extends DBAdapter {

    constructor(u, p, db, host, port) {
        super(u, p, db, host, port);

        this._user   = u;
        this._passwd = p;
        this._dbname = db;
        this._host   = host || "localhost";
        this._port   = port || 27017;

        this._data = [];

    }

    /**
     * No need to connect. Implementing to manage implement required interface. 
     * 
     * @param callback {function} called when the connection completes.
     *      Takes an error parameter.
     */
    connect(callback) {
        callback(null);
    }

    /**
     * Dummy method required for interface implementation.
     */
    close() {}

    /**
     * Returns the data from the memory data store.
     *
     * @param callback {function} called when query finishes.
     *      Takes two parameters: 1) error parameter, 2) data returned from query.
     */
    getAllTasks(callback) {
        callback(null, this._data);
    }

    /**
     * Adds a task to memory data store.
     *
     * @param task {object} represents the task to be added to the DB.
     * @param callback {function} called when query finishes.
     *      Takes a single error parameter.
     */
    addTask(task, callback) {
        task.id = (new Date()).getTime(); 
        this._data.push(task);
        callback(null);
    }

    /**
     * Remove a task from the memory store.
     *
     * @param id {number} id of object to remove.
     * @param callback {function} called when remove is complete.
     */
    removeTask(id, callback) {

        var indexToRemove = null;

        for (var i = 0; i < this._data.length; i++) {
            if (this._data[i].id === id) {
                indexToRemove = i;
                break;
            }
        }

        if (indexToRemove !== null) {
            this._data.splice(indexToRemove, 1);
        }
        
        callback(null);

    }

}

module.exports = MemoryDB; 

