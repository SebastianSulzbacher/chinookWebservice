var fixer = require('./our_fixer.js');

module.exports = function (app, db) {

    app.get('/team1/invoices/:id', function (request, response) {
        fixer.get(function (err, res, body) {
            // var Euro = fixer.convert("USD", "EUR", 1); // 1 US Dollars in Euro
            var invoices = [];
            db.get("select * from Invoice where invoiceid = " + request.params.id,
            function(err, row){
                row.Total =  fixer.convert("USD", "EUR", row.Total) +" Euro"; 
                invoices.push(row);
                response.send(invoices);
            })
          });
    });
};