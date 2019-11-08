var express = require("express");
var router = express.Router({mergeParams: true});

var middleware = require("../middleware/index");

var Campground = require("../models/campground");

//Restful Routes
// index
router.get("/", function(req,res) {
    // Get all campgrounds from db
    // console.log(req.user);
    Campground.find({}, function(err,campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
        }
    })
});

// new
//page to add a new campgroud  
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//create
//post request to a new campground  
router.post("/", middleware.isLoggedIn, function(req,res){
    //create a new Campground and add to DB
    var newCampground = req.body.campground;
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    }) 
});

//Show
router.get("/:id", function(req,res){
    // take req.params.id e findById in DB e display it
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if(err){
            console.log(err);
        } else {
            console.log(foundCamp)
            res.render("campgrounds/show", {campground:foundCamp});
        }
    });
});

// EDIT route
// show a form to edit a campground
router.get("/:id/edit",middleware.isLoggedIn,middleware.checkCampgroundOwnerShip, function(req,res){
    Campground.findById(req.params.id, function(err,foundCamp){
        if(err){
            console.log(err);
            return res.redirect("back");
        }
        res.render("campgrounds/edit",{campground:foundCamp});
    });
});

// UPDATE Route 
router.put("/:id",middleware.isLoggedIn,middleware.checkCampgroundOwnerShip,function(req,res){
    Campground.findOneAndUpdate({_id:req.params.id},req.body.campground,function(err,upCamp){
        if(err){
            console.log(err);
            return res.redirect("back");
        }
        res.redirect("/campgrounds/"+req.params.id);
    });
});

// DELETE Route
router.delete("/:id",middleware.isLoggedIn,middleware.checkCampgroundOwnerShip, function(req,res){
    Campground.findOneAndDelete({_id:req.params.id}, function(err,deletedCamp){
        if(err){
            console.log(err);
            return res.redirect("back");
        } 
        console.log(deletedCamp);
        res.redirect("/campgrounds");
    });
});


module.exports = router;