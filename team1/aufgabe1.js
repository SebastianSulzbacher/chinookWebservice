module.exports = function (app, db) {


    var all_artists = [];

    db.each("select ArtistId as id, Name from Artist", function (err, row) {
        if (err) return console.error(err);
        all_artists.push(row);
    });



    app.get('/artists', function (request, response) {
        response.json({ artists: all_artists });
    });
}