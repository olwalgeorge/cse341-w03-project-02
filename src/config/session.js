// config/session.js
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { env, db, sessionSecret } = require("./config");

const store = new MongoDBStore({
  uri: db.uri,
  collection: "sessions",
});

// Catch errors
store.on("error", function (error) {
  console.error("MongoDB session store error:", error);
});

module.exports = session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    httpOnly: true,
    secure: env === "production",
    maxAge: 24 * 60 * 60 * 1000, // Example: 24 hours
  },
});
