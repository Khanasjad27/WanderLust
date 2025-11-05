const express = require("express");
const router = express.Router({ mergeParams: true });
// Require wrapAsync
const wrapAsync = require("../utils/wrapAsync.js");
//REquire ExpressError
const ExpressError = require("../utils/ExpressError.js");
// REquire review model
const Review = require("../model/review.js");
// Require listing routes
const listings = require("../routes/listings.js");
const Listing = require("../model/listing.js");
//Require joi schema for listing
const {listingSchema} = require("../schema.js");
// Require Login Authenticated Middleware
const {isLoggedIn, validateReview, isReviewAuthor} = require("../middleware.js");
// Require Controller
const ReviewController = require("../Controllers/review.js");


// ReviewForm Render
router.get("/new", isLoggedIn,ReviewController.renderReviewForm);
// Review Submit to DB
router.post("/",isLoggedIn, validateReview,ReviewController.createReview);

// Delete Review Route
router.delete("/:reviewId" ,isLoggedIn, isReviewAuthor, wrapAsync(ReviewController.deleteReview));

module.exports = router;
