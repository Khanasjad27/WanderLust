// REquire review model & Listing model
const Review = require("../model/review.js");
const Listing = require("../model/listing.js");
const User = require("../model/user.js");

// Signup form render
module.exports.renderSignupForm =  (req, res) => {
    res.render("users/signup");
};
// Signup form submit
module.exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        let registeredUser = await User.register(newUser, password);

        req.login(registeredUser , (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success" , "Welcome to WanderLust!!");
            return res.redirect("/listing");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};
// Login form render
module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login");
};
// Login form submit
module.exports.login =  async (req, res) => {
    req.flash("success", "Welcome Back!!");
    const redirectUrl =  res.locals.redirectUrl || "/listing";
    return res.redirect(redirectUrl);
};
// Logout route
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logged Out Successfully!!");
        res.redirect("/listing");
    });
};