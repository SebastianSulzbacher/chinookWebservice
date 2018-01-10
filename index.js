var team1_routes = require('./team1.js');
var express = require('express')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Chinook_Sqlite.sqlite');

var env = require('cfenv'); 
var appEnv = env.getAppEnv();

// ich war hier :-)

var app = express();

team1_routes(app,db);

app.listen(appEnv.port,function(){
    console.log("webservice started at " + appEnv.url);
});

console.log("webservice about to start");