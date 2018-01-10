module.exports = function (app, db) {
    app.get('/albums/:albumId', function (req, res) {
        db.each("SELECT Album.Title AS AlbumTitle, Artist.Name AS ArtistName " +
            "FROM Album " +
            "INNER JOIN Artist ON Artist.ArtistId = Album.ArtistId " +
            "WHERE Album.AlbumId = " + req.params.albumId, function (err, row) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(row);
                }
            }, function (err, count) {
                if (err) {
                    res.send(err);
                }
                else if (count == 0) {
                    res.send("Kein Eintrag vorhanden!");
                }
            });
    })
}