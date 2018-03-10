var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus ornare ex, nec efficitur urna ullamcorper ut. Fusce blandit scelerisque lorem pretium faucibus. Ut semper, ligula vel lobortis porta, lorem felis luctus tellus, a porta sapien dolor at quam. Aliquam erat volutpat. Nullam lacinia egestas finibus. Vivamus a accumsan nisi."
    },
    {
        name: "Desert Mesa", 
        image: "https://c1.staticflickr.com/3/2474/3545376953_c3592590f8_b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus ornare ex, nec efficitur urna ullamcorper ut. Fusce blandit scelerisque lorem pretium faucibus. Ut semper, ligula vel lobortis porta, lorem felis luctus tellus, a porta sapien dolor at quam. Aliquam erat volutpat. Nullam lacinia egestas finibus. Vivamus a accumsan nisi."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus ornare ex, nec efficitur urna ullamcorper ut. Fusce blandit scelerisque lorem pretium faucibus. Ut semper, ligula vel lobortis porta, lorem felis luctus tellus, a porta sapien dolor at quam. Aliquam erat volutpat. Nullam lacinia egestas finibus. Vivamus a accumsan nisi."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
/*       if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        }); */
    }); 
}

module.exports = seedDB;