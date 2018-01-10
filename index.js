var team1_routes = require('./team1.js');
var aufgabe1 = require('./team1/aufgabe1.js');
var aufgabe5 = require('./team1/aufgabe5.js');
var aufgabe7 = require('./team1/aufgabe7.js');
// var aufgabe1 = require('./aufgabe1')
var aufgabe11 = require('./aufgabe11')
var aufgabe12 = require('./aufgabe12')
var aufgabe16 = require('./team1/aufgabe16.js');

var express = require('express')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Chinook_Sqlite.sqlite');

var env = require('cfenv'); 
var appEnv = env.getAppEnv();

// ich war hier :-)

var app = express();

team1_routes(app,db);
aufgabe1(app,db);
aufgabe5(app,db);
aufgabe7(app,db);
aufgabe11(app, db);
aufgabe12(app, db);
aufgabe16(app,db);


app.listen(appEnv.port,function(){
    console.log("webservice started at " + appEnv.url);
});

console.log("webservice about to start");