var express    = require("express");
var router     = express.Router({mergeParams: true}); // merging parameters to pull :id from app.js
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

//NEW show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req,res){
    // find campground by id
   Campground.findById(req.params.id, function(err,campground){
     if(err){
        console.log(err);
     }
     else{
        res.render("comments/new",{campground: campground}); 
     }
   });
});

//CREATE new comment
router.post("/", middleware.isLoggedIn, function(req,res){
   //lookup campground using ID
   Campground.findById(req.params.id,function(err,campground){
       if(err){
           console.log(err);
       } else {
         //create new comment
         Comment.create(req.body.comment, function(err,comment){
             if(err){
                 req.flash("error","Something went wrong.");
             } else {
                 //add username and id to comment
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 //save comment
                 comment.save();
                 //push comment into comments array (in campgrounds) & save
                 campground.comments.push(comment);
                 campground.save();
                 req.flash("success","Successfully added comment");
                 res.redirect("/campgrounds/" + campground._id);
             }
         });
       }
   });
});
//EDIT - edit a comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err || !foundCampground) {
           req.flash("error", "Campground not found.");
            return res.redirect("back");
       } 
       Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});     
            }
        });
    });
});
//UPDATE - update a comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success","Successfully updated comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//DELETE/DESTROY - delete a comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           console.log(err);
           res.redirect("back");
       } else {
           req.flash("success","Successfully deleted comment!");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

module.exports = router;