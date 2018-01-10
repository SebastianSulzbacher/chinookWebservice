var team1_routes = require('./team1.js');
var express = require('express')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./Chinook_Sqlite.sqlite');

var app = express();

team1_routes(app,db);

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