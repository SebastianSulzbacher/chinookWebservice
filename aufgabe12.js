module.exports = function (app, db) {
    var bodyParser = require('body-parser');
    var multer = require('multer'); // v1.0.5
    var upload = multer(); // for parsing multipart/form-data

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/customers/:id/invoices', upload.array(), function (req, res, next) {

        // Prüfen ob der Kunde existiert
        db.get("Select CustomerId From Customer WHERE CustomerId = " + req.params.id, function (err, row) {
            if (!row) {
                console.log("Kunde nicht gefunden!");
                res.send("Kunde nicht gefunden!");
            }
            else {
                // Insert in die DB
                db.run(
                    "Insert into Invoice " +
                    "( CustomerId, InvoiceDate, Total ) " +
                    "Values " +
                    "( $customerid, $invoicedate, $total )", {
                        $customerid: req.params.id,
                        $invoicedate: new Date().toLocaleDateString(),
                        $total: req.body.Total
                    }, function (err) {
                        if (err) {
                            console.error(err);
                            res.send(err);
                        }
                        else {
                            console.log(this.lastID);
                            var invoiceId = this.lastID;
                            var stmt = db.prepare(
                                "Insert Into InvoiceLine " +
                                "( InvoiceId, TrackId, UnitPrice, Quantity ) " +
                                "Values " +
                                "( $invoiceid, $trackid, $unitprice, $quantity )");

                            req.body.Lines.forEach(function (value, index) {
                                db.get("Select UnitPrice From Track WHERE TrackId = " + value.Track.id, function (err, row) {
                                    if (row) {
                                        stmt.run({
                                            $invoiceid: invoiceId,
                                            $trackid: value.Track.id,
                                            $unitprice: row.UnitPrice,
                                            $quantity: value.Quantity
                                        });
                                    }
                                    if (index == (req.body.Lines.length - 1)) {
                                        stmt.finalize();
                                        var invoice = req.body;
                                        invoice.InvoiceId = invoiceId;
                                        res.send(invoice);
                                    }
                                });
                            });
                        }
                    });
            }
        })
    })
}


