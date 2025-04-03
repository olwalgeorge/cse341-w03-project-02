// src/app.js
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database.js");
const routes = require("./routes/index.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const swaggerUi = require("swagger-ui-express");
const swaggerOutput = require("../swagger_output.json");
const passport = require("./config/passport.js");
const session = require("./config/session.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Session setup (required for Passport)
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static("public"));

// Routes
app.use("/", routes);

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
