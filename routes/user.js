const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../model/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
// Require Controller
const UserController = require("../Controllers/user.js");

// Signup form render & submit
router.route("/signup")
    .get(UserController.renderSignupForm)
    .post(wrapAsync(UserController.signup));

// Login form render & submit
router.route("/login")
    .get(UserController.renderLoginForm)
    .post(
        saveRedirectUrl ,
        passport.authenticate("local", {
            failureRedirect: "/login", 
            failureFlash: true        
        }),
        UserController.login
    );

// Logout route
router.get("/logout", UserController.logout);

module.exports = router;
