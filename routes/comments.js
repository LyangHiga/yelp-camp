var express = require("express");
var router = express.Router({mergeParams: true});

var middleware = require("../middleware/index");

// import models
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

// LOOK TO CAMPGROUND FIRST

// New Route
// display a form to add a new comment
router.get("/new", middleware.isLoggedIn, function(req,res){
    // splt views directories for campgrounds and comments routes
    // find the campground by its id and send it to page that will be render
    Campground.findById(req.params.id, function(err,foundCamp){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground:foundCamp});
        };
    })
    
});

//Create Route
//take the comment from the form and add it to the db

// a middleware is necessary here even if we protected its form, Although still is possible to send a 
// POST request to yhis address, PostMan would work in this case for example
router.post("/",middleware.isLoggedIn, function(req, res){
    // console.log(req.body.comment);
    //take the right camp by its id
    Campground.findById(req.params.id, function(err,camp){
        if(err){
            console.log(err);
        } else {
            //create a new comment
            Comment.create(req.body.comment, function(err,newComment){
                if(err){
                    console.log(err);
                } else {
                    // console.log("username: " + req.user.username + " id: " + req.user._id);
                    // add username and id
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    // save  comment
                    newComment.save();
                    //push the new comment to camp
                    camp.comments.push(newComment);
                    // SAVE otherwise NOTHING gonna happ.
                    camp.save();
                    console.log(newComment);
                    //redirect to show route
                    res.redirect("/campgrounds/"+req.params.id);
                }
            })
        }
    })
})

// Edit Route
// to show edit form with its comments info
router.get("/:comment_id/edit",middleware.isLoggedIn,middleware.checkCommentOwnerShip,function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            console.log(err);
            return res.redirect("back");
        };
        res.render("comments/edit",{comment:foundComment,campground_id: req.params.id});
    });
});

// Update Route
router.put("/:comment_id",middleware.isLoggedIn,middleware.checkCommentOwnerShip, function(req,res){
    Comment.findOneAndUpdate({_id:req.params.comment_id},req.body.comment, function(err,updatedComment){
        if(err){
            console.log(err);
            return res.redirect("back");
        }
        res.redirect("/campgrounds/"+req.params.id);
    });
});

// DELETE route
router.delete("/:comment_id",middleware.isLoggedIn,middleware.checkCommentOwnerShip,function(req,res){
    Comment.findOneAndRemove({_id:req.params.comment_id}, function(err){
        if(err){
            console.log(err);
            return res.redirect("back");
        }
        req.flash("success","Comment deleted!");
        res.redirect("/campgrounds/"+req.params.id);
    });
});

module.exports = router;