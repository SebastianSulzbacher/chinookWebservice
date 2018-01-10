module.exports = function (app, db) {
    app.get("/playlists/:id", function (req, res) {
        var playlistTracks = [];
        db.each("select p.Name as PlaylistName, t.TrackId, t.Name as Name, t.Composer, t.Milliseconds, t.Bytes, "
        + "t.UnitPrice, g.Name as Genre from Playlist as p inner join PlaylistTrack as pt on p.PlaylistId = pt.PlaylistId inner join Track as t on pt.TrackId = t.TrackId inner join Genre as g on t.GenreId = g.GenreId where p.Playlistid = " + req.params.id,
        function (err, row) {
            playlistTracks.push(row);
        }, function (err, number) {
            var playlist = {
                id: req.params.id,
                name: playlistTracks[0].PlaylistName,
                tracks: playlistTracks.map(function (value) {
                    return {
                        id: value.TrackId,
                        Name: value.Name,
                        Composer: value.Composer,
                        Length: (value.Milliseconds / 1000) + " Sekunden",
                        Bytes: value.Bytes,
                        UnitPrice: value.UnitPrice,
                        Genre: value.Genre
                    };
                })
            };
            res.send(playlist);
        });
    });


    app.get("/playlist2/:id", function (req, res) {
        var playlist = {};
        db.get("select p.PlaylistId as id, p.Name from Playlist as p where p.PlaylistId = " + req.params.id,
            function (err, row) {
                playlist.id = row.id;
                playlist.name = row.Name;
                playlist.tracks = [];
                db.each("select t.TrackId, t.Name as Name, t.Composer, t.Milliseconds, t.Bytes, "
                + "t.UnitPrice, g.Name as Genre from PlaylistTrack as pt inner join Track as t on pt.TrackId = t.TrackId inner join Genre as g on t.GenreId = g.GenreId where pt.Playlistid = " + playlist.id,
                function (err, row) {
                    playlist.tracks.push(row);
                },
                function (err, number) {
                    res.send(playlist);
                });
        });
    });
}