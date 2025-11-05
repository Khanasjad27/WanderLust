const Joi = require('joi');
const Listing = require('./model/listing');
// Listing Serverside validation schema
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        image : Joi.string().allow('',null),
        price : Joi.number().min(0),
        category : Joi.string().required().valid("Room", "Nature", "Sea Side", "Mountain", "Camping", "Castles", "Arctic", "Villa", "Iconic Cities"),
    })
});

// Review Serverside validation Schema
module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    })
});

