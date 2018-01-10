module.exports = function (app, db) {
    app.get('/artists', function (req, res) {
        res.setHeader('Content-Type', 'text/json');
        db.each("Select ArtistId as id, Name from Artist", function (err, row) {
            if (err) {
                res.send(err);
            }
            else {
                // res.write( JSON.stringify(row)+'\n');
                res.write( JSON.stringify(row));
            };
        }, function( err, count) {
            if (err) {
                res.send(err);
            }
            else if (count == 0) {
                res.send('Kein Eintrag gefunden')
            }
            else {
                res.end();
            }
        })
    })
}


