var express = require("express");
var app = express();
var request = require("request");
app.set("view engine","ejs");

app.get("/",function(req,res){
   res.render("search"); 
});

app.get("/results", function(req,res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s="+ query + "&apikey=thewdb"
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            if(data["Response"]=="True"){
                res.render("results",{data: data});
            }
            else{
                res.send("<h1>No Results Found.</h1><a href=\"/\">Return</a>");
            }
        }
    })
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Movie app starting...");
});