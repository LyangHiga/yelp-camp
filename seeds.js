var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    {
        name: "praia do sono",
        image: "https://i1.wp.com/mustsharebr.com/wp-content/uploads/2017/03/campingpraiadosono.jpg?resize=1200%2C900",
        description: "Cute website clean darn traveler blogger travelblogger, traveler WordPress colorful colorful colorful clean. Blogger fun colorful darn traveler whimsical fun. Expedition darn traveler website design theme organized. Webdesign traveling organized wanderlust webdesign, WordPress theme darn whimsical wanderlust pretty adventure clean. Organized traveling theme organized website travelblogger excursion design, simple modern colorful WordPress wanderlust."
    },
    {
        name: "Ilha Grande",
        image: "https://s2rio.com.br/wp-content/uploads/2018/05/lagoa-azul22-1024x683.jpg",
        description: "Cute website clean darn traveler blogger travelblogger, traveler WordPress colorful colorful colorful clean. Blogger fun colorful darn traveler whimsical fun. Expedition darn traveler website design theme organized. Webdesign traveling organized wanderlust webdesign, WordPress theme darn whimsical wanderlust pretty adventure clean. Organized traveling theme organized website travelblogger excursion design, simple modern colorful WordPress wanderlust."    
    },
    {
        name: "Maragogi",
        image: "https://live.staticflickr.com/1652/24208522895_c65e1fd657.jpg",
        description: "Cute website clean darn traveler blogger travelblogger, traveler WordPress colorful colorful colorful clean. Blogger fun colorful darn traveler whimsical fun. Expedition darn traveler website design theme organized. Webdesign traveling organized wanderlust webdesign, WordPress theme darn whimsical wanderlust pretty adventure clean. Organized traveling theme organized website travelblogger excursion design, simple modern colorful WordPress wanderlust."    
    }
]

function seedDB(){
    //Remove all Campgrouds
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        } else {
            console.log("All campgrounds were deleted");
            data.forEach(function(seed){
                Campground.create(seed, function(err,campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Campgroud were add");
                        Comment.create(
                            {
                                text: "Vai Corinthians",
                                author: "Eu"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save()
                                    console.log("Created a new comment");
                                }
                            }
                        )
                    };
                });
            });
        };
    });
};

module.exports = seedDB;