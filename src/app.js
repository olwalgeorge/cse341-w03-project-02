// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/database.js");
const routes = require("./routes/index.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const swaggerUi = require("swagger-ui-express");
const swaggerOutput = require("../swagger_output.json"); 
const passport = require("./config/passport.js"); 
const session = require("express-session"); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan("dev")); 

// Session setup (required for Passport)
app.use(
  session({
    secret: "your-secret-key", 
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/", routes);

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Error Handling Middleware
app.use(errorMiddleware);

// Database Connection
connectDB();

module.exports = app;
