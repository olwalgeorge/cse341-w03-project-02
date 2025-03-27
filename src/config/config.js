// src/config/config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET || "your-development-secret",
  db: {
    uri: process.env.MONGO_URI,
  },
};
