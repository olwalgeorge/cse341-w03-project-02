// src/config/config.js

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is required");
}

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET,
  db: {
    uri: process.env.MONGO_URI,
  }
};