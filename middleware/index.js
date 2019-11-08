var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObj = {};


// middleware to check if user is logged
middlewareObj.isLoggedIn =  function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first");
    res.redirect("/login");
};

// middleware to check who created this camp
middlewareObj.checkCommentOwnerShip =  function (req,res,next){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            console.log(err);
            req.flash("error","Comment not found");
            return res.redirect("back");
        }
        if(foundComment.author.id.equals(req.user._id)){
            return next();
        }
        req.flash("error","You don't permission to do that");
        res.redirect("back");
    });
};

// middleware to check who created this camp
middlewareObj.checkCampgroundOwnerShip =  function (req,res,next){
    Campground.findById(req.params.id, function(err,foundCamp){
        if(err){
            console.log(err);
            req.flash("error","Campground not found");
            return res.redirect("back");
        }
        if(foundCamp.author.id.equals(req.user._id)){
            return next();
        }
        req.flash("error","You don't permission to do that");
        res.redirect("back");
    });
};

module.exports = middlewareObj;