const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js"); 

// Connection with mongoose
main()
    .then ((res) =>{
        console.log("Connection Created with mongoose");
    }).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
};

const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({
        ...obj, owner : "690b09ff8d60e8f02ad9874d",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data Inserted");
};

initDB();