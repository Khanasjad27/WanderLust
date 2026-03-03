require("dotenv").config({ path: "../.env" }); // ✅ Fix for nested folder

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

async function main() {
  console.log("ATLAS_URL =", process.env.ATLAS_URL); // Debug line
  await mongoose.connect(process.env.ATLAS_URL);
  console.log("✅ Connected to MongoDB Atlas");
}

main().catch(err => console.log("❌ Connection error:", err));

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("🧹 Old data cleared!");

    initData.data = initData.data.map(obj => ({
      ...obj,
      owner: "690bb68ae6b75490b1edb031", // Replace with your user ID
    }));

    await Listing.insertMany(initData.data);
    console.log("✅ Sample data successfully inserted into MongoDB Atlas!");
  } catch (e) {
    console.log("❌ Error while inserting data:", e);
  } finally {
    mongoose.connection.close();
  }
};

initDB();
