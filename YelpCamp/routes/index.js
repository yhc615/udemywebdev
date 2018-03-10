var express  = require("express");
var router   = express.Router();

var passport = require("passport");
var User     = require("../models/user");
//===================
// REST convention routes:
//=====================
//AUTH routes
//REGISTER - show form
router.get("/register",function(req,res){
    res.render("register");
});
//handle sign up logic
router.post("/register",function(req,res){
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp, " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});
//LOGIN - show form
router.get("/login",function(req,res){
   res.render("login"); 
});

//handle login logic
router.post("/login",passport.authenticate("local",
   { successRedirect: "/campgrounds", 
     failureRedirect: "/login"  
   }), function(req,res){
});

//LOGOUT
router.get("/logout",function(req,res){
   req.logout();
   req.flash("success","Logged You Out!");
   res.redirect("/campgrounds");
});

//HOME route
router.get("/",function(req,res){
    res.render("landing");
});

module.exports = router;