// REquire review model & Listing model
const Review = require("../model/review.js");
const Listing = require("../model/listing.js");
// ReviewForm Render
module.exports.renderReviewForm =  async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("listings/review", { list });
};

// Review Submit to DB
module.exports.createReview =  async (req,res)=>{
    let list = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    // res.send("Review Added");
    req.flash("success" , "New Review Added");
    res.redirect(`/listing/${list._id}`);
}; 

// Delete Review Route
module.exports.deleteReview =  async (req, res) =>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Review Deleted");
    res.redirect(`/listing/${id}`);
};