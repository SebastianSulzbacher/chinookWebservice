module.exports = function(app,db){
    app.get("/",function(request,response){
        response.send("Hallo Welt");
    });
    
    app.get("/static",function(request,response){
        var artist = {
            name: "Ian Kilmister",
            instrument: "heavy bass",
            birthday : "24.12.1945"
        }
        // var responseString = JSON.stringify(artist);
        response.send(artist);
    });
    
    app.get("/dynamic/:username",function(req,res){
        requestCounter.inc();
        var response = {
            date: new Date(),
            count : requestCounter.counter,
            username: req.params.username
        } 
        res.send(response);
    });
}