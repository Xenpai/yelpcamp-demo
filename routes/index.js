//jshint esversion:6, undef:true, node:true
let express = require('express');
let router = express.Router();
let passport = require('passport');
let User = require('../models/user');

router.get("/", (req, res) => {
    res.render("landing");
});

//AUTH ROUTES

router.get("/register", (req, res) => {
    res.render("register");
});
// Register Logic

router.post("/register", (req, res) => {
    let newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

//Show login form

router.get("/login", (req, res) => {
    res.render("login");
});

//adding login ROUTES

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {});

//logout ROUTES

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully Logged Out.");
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
