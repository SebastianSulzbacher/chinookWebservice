var teamOnePiece = function (app, db) {
    "use strict";
    var result;

    app.get("/artists", function (request, response) {
        result = [];
        db.each("select artistid, Name from artist", function (err, row) {
            if (err) {
                result.push("Error!");
            } else {
                result.push(row);
            }
        }, function (error) {
            response.send(result);
        });
    });

    app.get("/playlists", function (request, response) {
        result = [];
        db.each("select playlistid, Name from playlist", function (err, row) {
            if (err) {
                result.push("Error!");
            } else {
                result.push(row);
            }
        }, function (error) {
            response.send(result);
        });
    });

    app.get("/artists/:artistId/albums", function (request, response) {
        result = [];
        db.each("select AlbumId, Title from album where ArtistId = " + request.params.artistId,
            function (error, row) {
                if (error) {
                    result.push("Error!");
                } else {
                    result.push(row);
                }
            },
            function (error) {
                response.send(result);
            });
    });

    app.get("/customers", function (request, response) {
        result = [];
        db.each("select customerid, firstname, lastname, company, address, city, postalcode, email from customer",
            function (error, row) {
                if (error) {
                    result.push("Error!");
                } else {
                    result.push(row);
                }
            },
            function (error) {
                response.send(result);
            });
    });

    app.get("/customers/:customerid/invoices", function (request, response) {
        db.all("select I.CustomerId, I.InvoiceId, I.InvoiceDate, I.Total, IL.Quantity, T.Name "
            + "from Invoice as I join InvoiceLine as IL join Track as T on I.InvoiceId = IL.InvoiceId "
            + "and IL.TrackId = T.TrackId where I.CustomerId = " + request.params.customerid,
            function (err, rows) {
                var result = {};
                result.InvoiceId = rows[0].InvoiceId;
                result.InvoiceDate = rows[0].InvoiceDate;
                result.Total = rows[0].Total;
                result.Lines = rows.map(function (row) {
                    return {
                        Name: row.Name,
                        quantity: row.Quantity
                    };
                });
                response.send(result);
            });
    });

    app.post("/playlists", function (request, response) {
        result = [];
        db.each("select playlistid, Name from playlist", function (err, row) {
            if (err) {
                result.push("Error!");
            } else {
                result.push(row);
            }
        }, function (error) {
            response.send(result);
        });
    });
}

module.exports = teamOnePiece;