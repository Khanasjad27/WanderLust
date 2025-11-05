// mongoose require
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingScheme = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image: {
        filename: String,
        url: String,
    },
    price: {
        type: Number,
        default: 0,   // prevents null error
    },
    location : String,
    country : String,
    reviews : [
        {
            type :Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    category: {
        type: String,
        enum: [
            "Room",
            "Nature",
            "Sea Side",
            "Mountain",
            "Camping",
            "Castles",
            "Arctic",
            "Villa",
            "Iconic Cities"
        ],
        required: true
    },
});
// If listing is deleted → delete all related reviews
listingScheme.post("findOneAndDelete", async (list) => {
    if (list) {
        await Review.deleteMany({
            _id: { $in: list.reviews }
        });
    }
});


const Listing = new mongoose.model("Listing" , listingScheme);

module.exports = Listing;

