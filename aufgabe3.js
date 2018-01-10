module.exports = function (app, db) {
    app.get('/artists/:artistId/albums', function (req, res) {
        res.setHeader('Content-Type', 'text/json');
        db.each("SELECT AlbumId AS id, Title " +
            "FROM Album " +
            "WHERE ArtistId = " + req.params.artistId, function (err, row) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.write(JSON.stringify(row));
                }
            }, function (err, count) {
                if (err) {
                    res.send(err);
                }
                else if (count == 0) {
                    res.send("Kein Eintrag vorhanden!");
                }
                else {
                    res.end();
                }
            });
    })
}