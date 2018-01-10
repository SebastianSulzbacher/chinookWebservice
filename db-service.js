const sqlite3 = require('sqlite3');
let dbService = (function() {
    // init
    let db = new sqlite3.Database('./Chinook_Sqlite.sqlite');

    function artists(id, cb) {
        db.all(`select ArtistId as id, Name from Artist ${(typeof id !== 'undefined') ? ('where ArtistId = ' + id) : ('')}`, (err, all) => {
            if (err) return console.error(err);
            cb(all);
        });
    }
    function playlists(cb) {
        db.all('select PlaylistId as id, Name from Playlist', (err, all) => {
            if (err) return console.error(err);
            cb(all);
        });
    }
    function albumTracks(id, cb) {
        db.all(`select TrackId as id, Milliseconds / 1000 as Length, Bytes, UnitPrice, Genre.Name as Genre from Track, Genre where Genre.GenreId = Track.GenreId and Track.AlbumID = ${id}`, (err, all) => {
            if (err) return console.error(err);
            cb(all);
        });
    }
    function artistAlbums(id, cb) {
        db.all(`select AlbumId as id, Title from Album where ArtistId = ${id}`, (err, all) => {
            if (err) return console.error(err);
            cb(all);
        });
    }
    function customers(id, cb) {
        db.all(`select CustomerId as id, FirstName, LastName, Company, Address, City, PostalCode, Email
        from Customer ${(typeof id !== 'undefined') ? ('where CustomerId = ' + id) : ('')}`, (err, all) => {
            if (err) return console.error(err);
            cb(all);
        });
    }
    function tracks(id, cb) {
        db.all(`select TrackId as id, Milliseconds / 1000 as Length, Bytes, UnitPrice, Genre.Name as Genre from Track, Genre where Genre.GenreId = Track.GenreId ${(typeof id !== 'undefined') ? ('and TrackId = ' + id) : ('')}`, (err, all) => {
            if (err) return console.error(err);
            cb(all);
        });
    }
    function customerInvoices(id, cb) {
        let results = [];
        db.each(`select InvoiceId, InvoiceDate, Total from Invoice where CustomerId = ${id}`, (err, row) => {
            row.Lines = [];
            db.each(`select TrackId, Quantity from InvoiceLine where InvoiceId = ${row.InvoiceId}`, (err, lineRow) => {
                tracks(lineRow.TrackId, (tracks) => {
                    row.Lines.push({Track: tracks[0], Quantity: lineRow.Quantity});
                });
            }, () => {
                delete(row.InvoiceId);
                results.push(row);
            });
        }, (err, nol) => {
            if (err) console.error(err);
            setTimeout(() => {
                cb(results);
            }, 10);
        });
    }
    function invoices(id, cb) {
        db.all(`select InvoiceId, InvoiceDate, Total from Invoice ${(typeof id !== 'undefined') ? ('where InvoiceId = ' + id) : ('')}`, (err, all) => {
            if (err) return console.error(err);
            cb(all);
        });
    }
    function deletePlaylist(id) {
        db.exec(`delete from Playlist where PlaylistId = ${id}`);
    }
    function putPlaylist(id, object) {
        db
            .exec(`delete from PlaylistTrack where PlaylistId = ${id}`, () => {
                object.tracks.forEach((value, index) => {
                    db.exec(`insert into PlaylistTrack (PlaylistId, TrackId) values ('${id}', '${value}')`);
                });
            })
            .exec(`update Playlist set Name = '${object.Name}' where PlaylistId = ${id}`)
        ;
    }
    function postPlaylist(object, cb) {
        db.run(`insert into Playlist (Name) values ('${object.Name}')`, function(err) {
            if (err) return console.error(err);
            let playlistId = this.lastID;
            object.tracks.forEach((value, index) => {
                db.run(`insert into PlaylistTrack (PlaylistId, TrackId) values ('${playlistId}', '${value.id}')`);
            });
            cb(playlistId);
        });
    }

    

    return {
        artists,
        playlists,
        albumTracks,
        artistAlbums,
        customers,
        customerInvoices,
        tracks,
        invoices,
        deletePlaylist,
        putPlaylist,
        postPlaylist
    };
})();
module.exports = dbService;