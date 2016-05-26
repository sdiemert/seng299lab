# SENG 299 Timer Application 

## Purpose 

This repository contains code for the lab exercises for a software architecture course (SENG 299) at the University of Victoria. 

This is a simple NodeJS time tracking web application. 

## Application Use

The application will by default create a server that listens on port 3000. 

### System Prerequisites

This application has been developed in an environment running/using: 

* Google Chrome web browser, version 50.0
* NodeJS v4.4.3 or greater
* Node Package Manager, v2.15.1 or greater
* MongoDB

### Starting Application

#### Dependancies

First, install the dependencies: 

```bash
$ npm install
```

#### Mongo 

Start MongoDB's daemon. This is a system specific activity: 

* On Window's you will have to find the executable for MongoDB and run it. 
* On a Unix system you may have to run `$ mongod` on the command line. 

#### Start 

Then run the application using either: 

```bash
$ npm start
```

OR 

```bash
$ node server.js 
```

#### Use 

If running your server on your own computer navigate to `http://localhost:3000`. If using another server or port, adjust the URL accordingly. 

## Notes to Students

Your task(s) for the lab are described in the lab manual available on the course website. 

You may find the following links/resources helpful: 

* [https://github.com/mongodb/node-mongodb-native](https://github.com/mongodb/node-mongodb-native)
* [https://www.mongodb.com/](https://www.mongodb.com/)
* [https://docs.mongodb.com/manual/](https://docs.mongodb.com/manual/)
* [https://nodejs.org/en/](https://nodejs.org/en/)
