const Listing = require("../model/listing.js");

// // show all list / Main
module.exports.index = async (req,res) =>{ 
    let lists = await Listing.find({});
    res.render("listings/allListings", {lists})
};
// Create n Update 
// For Create form render
module.exports.renderNewForm = (req,res) =>{
    res.render("listings/new" );
};
// Add form in DB
module.exports.createListing =  async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    category = req.body.listing.category;
    // If user post req ki help se data send karne ki koshish karega lakin kuch data add nhi kiya therefore DB me kuch add nhi hua
    if(!req.body.listing){
        throw new ExpressError(500, "Send valid data for Listings");
    }

    const newList = new Listing(req.body.listing);
    newList.owner = req.user._id;
    newList.image = {url , filename};
    newList.category = category;
    await newList.save(); 
    req.flash("success" , "New Listing added");
    res.redirect("/listing");
};
// filter route
module.exports.filterCategory = async (req , res) =>{
    let {category} = req.params;
    try{
        const lists = await Listing.find({category});
        res.render("listings/allListings" , {lists , category});
    }catch(e){
        req.flash("error" , "Cannot find listings for this category");
        res.redirect("/listing");
    }
}
// Search Route
module.exports.searchListings = async (req,res) =>{
    let {q} = req.query;

    // If user did't enter something in search bar n click search
    if(!q || q.trim()===""){
        req.flash("error" , "Please something in search Bar");
        return res.redirect("/listing");
    }

    // Case Sensitive to deal karre hai yaha pe
    let regex = new RegExp(q , "i"); // "i" for case insensitive
    let lists = await Listing.find({
        $or: [
            {title : regex},
            {category : regex},
            {location : regex},
            {country : regex},
        ],
    });

    if(lists.length === 0){
        req.flash("error" , `No result found for ${q}`);
        return res.redirect("/listing");
    };

    res.render("listings/allListings" , {lists , category : null});
};
//  privacy route
module.exports.privacy = (req,res) =>{
    res.render("privacy&terms/privacy");
}
// terms route
module.exports.terms = (req,res) =>{
    res.render("privacy&terms/terms");
}
//Show info of Specific list / Show Route
module.exports.showListing =  async(req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id).populate({path :"reviews", populate : { path : "author"}}).populate("owner");
    res.render("listings/show" , {list});
};
// Edit n Update Route
// For Edit form render / show specific listing
module.exports.renderEditForm =  async (req,res) =>{
    let {id} = req.params;
    const list = await Listing.findById(id).populate("reviews");
    if(!list){
        req.flash("error", "Can't find that Listing");
        return res.redirect("/listing");
    }
    let orgImgUrl = list.image.url;
    orgImgUrl = orgImgUrl.replace("/upload" , "/upload/h_300,w_250");
    res.render("listings/edit" , {list , orgImgUrl});
};
// Update in DB
module.exports.updateListing =  async (req, res)=>{
    // If user post req ki help se data send karne ki koshish karega lakin kuch data add nhi kiya therefore DB me kuch add nhi hua
    if(!req.body.listing){
        throw new ExpressError(500, "Send valid data for Listings");
    }
    let {id} = req.params;
    const list = await Listing.findByIdAndUpdate( id, req.body.listing );
    category = req.body.listing.category;
    list.category = category;
    await list.save();
    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        list.image = {url , filename};
        await list.save();
    }
    req.flash("success" , "Listing Updated");
    res.redirect(`/listing/${id}`);
};
// Delete Listing
module.exports.deleteListing = async (req,res) =>{
    let {id} = req.params;
    let list = await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted");
    res.redirect("/listing");
}