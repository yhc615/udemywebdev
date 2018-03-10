var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User          = require("./models/user"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    seedDB        = require("./seeds");
//requiring Routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"
mongoose.connect(url);//use environment varibles to specify DATABASEURL
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//Passport Configurations
app.use(require("express-session")({
    secret: "This is my darkest secret!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //authenticate() method comes from "passport-local-mongoose" pkg
passport.serializeUser(User.serializeUser()); //same goes for serializeUser()
passport.deserializeUser(User.deserializeUser()); //and deserializeUser()

//Passing current User data to all routes as vars in the ejs templates *note that this middleware must be placed after the passport configurations
app.use(function(req, res, next){
   res.locals.currentUser = req.user; //USER data
   res.locals.error = req.flash("error"); //error message flash data
   res.locals.success = req.flash("success"); //success message "
   next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp Server starting...");
});