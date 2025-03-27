// src/config/database.js
const mongoose = require("mongoose");
const { db } = require("../config/config.js");
const logger = require("../utils/logger.js");

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB with URI:', db.uri); 
    await mongoose.connect(db.uri);
    logger.info("MongoDB Connected...");
  } catch (err) {
    logger.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
