//ENV
if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
// Express Reqiire
const express = require("express");
const app = express();
// mongoose require
const mongoose = require("mongoose");
// Defining path
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine" , "ejs");
//Connecting Public
app.use(express.static(path.join(__dirname , "public")));
//For encoded Data
app.use(express.urlencoded({extended : true}));
//Method override require
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// EJS mate Require
const ejsMate = require("ejs-mate");
app.engine("ejs" , ejsMate);
// Require Listing
const Listing = require("./model/listing.js");
const { title } = require("process");  // can be removed => gery color meens ki use nhi ho rha
// Require wrapAsync
const wrapAsync = require("./utils/wrapAsync.js");
//REquire ExpressError
const ExpressError = require("./utils/ExpressError.js");
//Require joi schema for listing
const {listingSchema} = require("./schema.js"); // can be removed => gery color meens ki use nhi ho rha
// REquire review model
const Review = require("./model/review.js");
//Require joi schema for Review
const {reviewSchema} = require("./schema.js"); // can be removed => gery color meens ki use nhi ho rha
// Require listing routes
const listingsRouter = require("./routes/listings.js");
// Require review routes
const reviewsRouter = require("./routes/reviews.js");
// Require session
const session = require("express-session");
// Require flash
const flash = require("connect-flash");
// Require passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
// Require User model
const User = require("./model/user.js");
// Require listing routes
const userRouter = require("./routes/user.js");
// require connet-mongo
const MongoStore = require("connect-mongo");
// Connection with mongoose
// let MONDO_URL = 'mongodb://127.0.0.1:27017/Wanderlust';
let Cloud_URL = process.env.ATLAS_URL; // Cloud url
main()
    .then ((res) =>{
        console.log("Connection Created with mongoose");
    }).catch(err => console.log(err));

async function main() {
  await mongoose.connect(Cloud_URL);
};
const store = MongoStore.create({
  mongoUrl: Cloud_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60, // 1 day (in seconds)
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR:", e);
});
// Session options
const sessionOpts = {
    store,
    secret :  process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() +3 * 24 * 60 * 60 *1000,
        maxAge : 3 * 24 *60 *60 *1000,
        httpOnly : true,
    }
}

app.use(session(sessionOpts));
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// flash middle ware
app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Using user Routes
app.use("/", userRouter);
// Using Listing Routes
app.use("/",listingsRouter);
// Using review Routes
app.use("/listings/:id/reviews", reviewsRouter); 

// Root
// app.get("/", (req,res) =>{
//     res.send("You are at Root");
// });


// Any of the Route did'nt match then this error will throw
app.all("*", (req,res,next)=>{
    next(new ExpressError(404,"Page not Found"));
});

// Error Handling
app.use((err,req,res,next) =>{
    let {status = 500 , message = "Somthing went Wrong"} = err;
    res.status(status).render("error.ejs",{message});
});
app.listen(8080 ,() =>{
    console.log("Server Started");
});