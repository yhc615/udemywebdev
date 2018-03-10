var Campground = require("../models/campground");
var Comment    = require("../models/comment");
// all middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next) {
    //is user logged in?
    if(req.isAuthenticated()){
         Campground.findById(req.params.id,function(err,foundCampground){
            if(err || !foundCampground /* !foundCampground logic handles null object Campgrounds(when :id is of same length but non-valid) */){
                req.flash("error", "Campground not found")
                res.redirect("back");
            } else {
                // does user own campground?
                if(foundCampground.author.id.equals(req.user._id)){ //using method equals() here instead of === because author.id is type=obj while user._id is type=string (provided by mongoose)
                  next(); // proceed from middleware here
                } else {
                  req.flash("error","permission denied");
                  res.redirect("back");
                }
            }
         });
    } else {
        req.flash("error", "You need to be logged in to do that.")
        res.redirect("back")
    }
};

middlewareObj.checkCommentOwnership = function(req,res,next) {
    //is user logged in?
    if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err || !foundComment /* handles null object comments(when :id is of same length but non-valid) */){
                req.flash("error", "Comment not found")
                res.redirect("back");
            } else {
                // does user own campground?
                if(foundComment.author.id.equals(req.user._id)){ //using method equals() here instead of === because author.id is type=obj while user._id is type=string (provided by mongoose)
                  next(); // proceed from middleware here
                } else {
                  req.flash("error","permission denied");
                  res.redirect("back");
                }
            }
         });
    } else {
        req.flash("error", "You need to be logged in to do that.")
        res.redirect("back")
    }
};

middlewareObj.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login!");
    res.redirect("/login");
};

module.exports = middlewareObj;