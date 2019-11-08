var express = require("express");
var router  = express.Router();

var passport    = require("passport");
var User        = require("../models/user");


//routes
router.get("/", function(req,res) {
    res.render("landing");
});


// ===================
// Auth Routes
// ===================

// show register form
router.get("/register",function(req,res){
    res.render("register");
});

// handle Sign Up Logic
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
router.get("/login", function(req,res){
    res.render("login");
});

// handle Login Logic
// middleware
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req,res){    
});

// logout route
router.get("/logout", function(req,res){
    req.logOut();
    req.flash("success","Logout!");
    res.redirect("/campgrounds");
});

module.exports = router;