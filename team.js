const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const dbService = require('./db-service');
var bodyParser = require('body-parser');


// parse application/json 
app.use(bodyParser.json());

let db = new sqlite3.Database('./Chinook_Sqlite.sqlite');

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/static', (req, res) => {
    let response = {
        hallo: "Welt",
        antwort: 42
    };
    res.send(response);
});

let aufrufe = {};

app.get('/dynamic/:username', (req, res) => {

    let today = new Date();

    if (typeof aufrufe[req.params.username] === 'number') {
        aufrufe[req.params.username]++;
    } else {
        aufrufe[req.params.username] = 1;
    }
    res.send({
        zeit: today.toISOString(),
        aufrufe: aufrufe[req.params.username],
        name: req.params.username
    });

});

// Gib alle Künstler zurück
app.get(['/artists', '/artists/:id'], (req, res) => {
    dbService.artists(req.params.id, (artists) => {
        res.send(artists);

    });
});

app.get('/artists/:artistid/albums', (req, res) => {
    dbService.artistAlbums(req.params.id, (artists) => {
        res.send(artists);
    })
});

// Gib eine Liste der verfügbaren Playlists zurück(id und name)

app.get('/playlists', (req, res) => {
    dbService.playlists((playlists) => {
        res.send(playlists);

    });
});

app.delete('/playlists/:id', (req, res) => {
    dbService.deletePlaylist(id);
    res.send('ok');
});

app.put('/playlists/:id', (req, res) => {
    dbService.putPlaylist(req.params.id, req.body);
    res.send('ok');
});

app.post('/playlists', (req, res) => {
    dbService.postPlaylist(req.body, (id) => {
        res.send(id);
    });
});



// Gibt eine Liste der Kunden zurück

app.get(['/customers', '/customers/:id'], (req, res) => {
    dbService.customers(req.params.id, (customers) => {
        res.send(customers);

    });
});

// Gibt die Rechnungen zu einem Kunden zurück

app.get(['/customers/:id/invoices'], (req, res) => {
    dbService.customerInvoices(req.params.id, (customerInvoices) => {
        res.send(customerInvoices);

    });
});

// Gibt die Tracks eines bestimmten Albums wieder

app.get('/albums/:albumId/tracks', (req, res) => {
    dbService.albumTracks(req.params.albumId, (albumTracks) => {
        res.send(albumTracks);

    });
});

//  Gibt die Rechnung mit der angegebenen ID zurück

app.get(['/invoices', '/invoices/:id'], (req, res) => {
    dbService.invoices(req.params.id, (invoices) => {
        res.send(invoices);

    });
});

app.listen(3000, function () {
    console.log("Webservice ist gestartet");
});