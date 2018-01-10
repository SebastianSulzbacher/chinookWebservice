var team1_routes = require('./team1.js');
var aufgabe1 = require('./team1/aufgabe1.js');
var aufgabe5 = require('./team1/aufgabe5.js');
var aufgabe7 = require('./team1/aufgabe7.js');
var aufgabe16 = require('./team1/aufgabe16.js');

var express = require('express')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Chinook_Sqlite.sqlite');

// ich war hier :-)


var app = express();

team1_routes(app,db);
aufgabe1(app,db);
aufgabe5(app,db);
aufgabe7(app,db);
aufgabe16(app,db);

app.listen(3000,function(){
    console.log("webservice started");
});

db.each("select ArtistId as id, Name from Artist", function (err, row) {
    if (err) { 
        console.error(err);
        return;
    };
    console.log(row);
});

console.log("webservice about to start");