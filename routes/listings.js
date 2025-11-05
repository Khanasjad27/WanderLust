const express = require("express");
const router = express.Router();
// Require Listing
const Listing = require("../model/listing.js");
const { title } = require("process");
// Require wrapAsync
const wrapAsync = require("../utils/wrapAsync.js");
// Require Login Authenticated Middleware
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
// Require Controller
const ListingController = require("../Controllers/listing.js");
// Require Multer for Image Upload
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});


// show all list / Main
router.get("/listing" , wrapAsync (ListingController.index)); 

// Create n Update 
// For Create form render
router.get("/listings/new" , isLoggedIn ,ListingController.renderNewForm);
// Add form in DB
router.post("/listings",upload.single("listing[image]") , validateListing, isLoggedIn,wrapAsync (ListingController.createListing));
// filter route
router.get("/listings/category/:category" , wrapAsync ( ListingController.filterCategory));
// Search Route
router.get("/listings/search" , wrapAsync(ListingController.searchListings));
// Privacy route
router.get("/privacy" , ListingController.privacy);
// Terms route
router.get("/terms" , ListingController.terms);

//Show info of Specific list / Show Route
router.get("/listing/:id" ,wrapAsync ( ListingController.showListing));

// Edit n Update Route
// For Edit form render / show specific listing
router.get("/listings/:id/edit" , isLoggedIn,isOwner,  wrapAsync (ListingController.renderEditForm)); 
// Update in DB
router.put("/listings/:id" ,isLoggedIn,isOwner,upload.single("listing[image]"), validateListing, wrapAsync (ListingController.updateListing));

// Delete Listing
router.delete("/listings/:id" ,isLoggedIn,isOwner,validateListing, wrapAsync (ListingController.deleteListing));

module.exports = router;