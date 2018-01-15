module.exports = function (app, db) {

    app.get("/team1/album/:albumId/tracks", function (req, res) {
        var tracks = [];
        db.each("select t.Name as Name,"
                + " t.Composer,"
                + " t.Milliseconds,"
                + " t.Bytes,"
                + " t.UnitPrice,"
                + " g.Name as Genre"
                + " from Track as t"
                    + " inner join Genre as g on t.GenreId = g.GenreId"
                + " where AlbumId = " + req.params.albumId,
        function (err, row)  {
            row.Length = (row.Milliseconds / 1000) + " Sekunden";
            delete row.Milliseconds;
            tracks.push(row);
        },
        function (err, number) {
            res.send(tracks);
        });
    });
};