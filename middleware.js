const list = require("./model/listing");
const Review = require("./model/review");
//REquire ExpressError
const ExpressError = require("./utils/ExpressError.js");
//Require joi schema for listing and review
const {listingSchema , reviewSchema} = require("./schema.js");


module.exports.isLoggedIn = (req,res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "You are not Logged In / Signed In");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
// VAlidation of Error for Listing
module.exports.validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else{
        next();
    }
};
// VAlidation of Error for Review
module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else{
        next();
    }
};


// Only user can edit or delete their own listings 
module.exports.isOwner = async (req,res,next) =>{
    const {id} = req.params;
    const List = await list.findById(id);
    if(!List.owner.equals(res.locals.currUser._id)){
        req.flash("error" , "You are not owner of this listing");
        return res.redirect(`/listing/${id}`);
    } next();
}
// Only user can edit or delete their own Reviews 
module.exports.isReviewAuthor = async (req,res,next) =>{
    let {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error" , "You do not have permission to do that");
        return res.redirect(`/listing/${id}`);
    } next();
}