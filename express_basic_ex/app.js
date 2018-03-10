var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal",function(req,res){
    var animal = req.params.animal;
    var sounds = {
      dog : "Woof Woof",
      cat : "Miao",
      chicken: "Pkwak",
      cow : "Moo",
      Human : "Hello"
    };
    
   res.send(animal+" says "+sounds[animal]+"!!");
});

app.get("/repeat/:word/:number",function(req,res){
   var n = req.params.number;
   var word = req.params.word + " ";
   var msg = "";
   for(var i=0;i<n;i++){
       msg += word
   }
   res.send(msg);
});

app.get("*",function(req,res){
   res.send("Page not found.");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Starting App...");
})