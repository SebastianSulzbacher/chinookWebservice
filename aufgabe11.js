module.exports = function (app, db) {
    app.get('/invoices/:id', function (req, res) {
        // res.setHeader('Content-Type', 'text/json');
        db.each("Select Invoice.InvoiceId, Invoice.CustomerId, Invoice.InvoiceDate, Invoice.Total, " +
        "InvoiceLine.TrackId " +
        "From Invoice " +
        "Inner join InvoiceLine " +
        "on InvoiceLine.InvoiceID = Invoice.InvoiceId " +
        "Where Invoice.InvoiceId = " + req.params.id, function (err, row) {
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
