//jshint esversion: 6
let mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');
let data = [{
    name: "Cat1",
    image: "https://static.pexels.com/photos/22346/pexels-photo.jpg",
    description: "A cute cat"
}, {
    name: "Cat2",
    image: "https://images.pexels.com/photos/290263/pexels-photo-290263.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
    description: "A cute cat"
}, {
    name: "Cat3",
    image: "https://images.pexels.com/photos/162064/cat-british-shorthair-thoroughbred-adidas-162064.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
    description: "A cute cat"
}, ];

function seedDB() {
    Campground.remove({}, (err) => {
        console.log("Removed Campgrounds");
        data.forEach(function(seed) {
            Campground.create(seed, (err, campground) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Created Campground!");
                    //CREATE A COMMENT
                    Comment.create({
                        text: "This cat is cute, but I was it was a Maine Coon",
                        author: "Homer"
                    }, (err, comment) => {
                        campground.comments.push(comment);
                        campground.save();
                    });
                }
            });
        });
    });

}

module.exports = seedDB;
