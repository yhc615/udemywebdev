var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/",function(req,res){
    //Get all campgrounds from db
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    });
    
});

//CREATE - add new campground to DB
router.post("/",function(req,res){
    // get data from form and add to campgrounds db
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = { id: req.user._id,
                   username: req.user.username
                };
    var newCampground = {name: name, image: image, author: author, description: desc};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});
//order matters (/:id can also match to /new, order needed for uniqueness)

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground /* !foundCampground logic handles null object Campgrounds(when :id is of same length but non-valid) */){
            req.flash("error","Campground not found");
            res.redirect("back");
        } else {
            //render show template with that campground
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});

//EDIT - edit a campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        //error shouldn't exist due to middleware
        res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});
//UPDATE - update a campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           req.flash("success","Successfully updated campground!");
           res.redirect("/campgrounds/" + updatedCampground._id);
       }
   }); 
});
// DELETE/DESTROY - delete a campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            req.flash("success","Successfully deleted campground!");
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;