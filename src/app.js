// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/database.js");
const routes = require("./routes/api.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const swaggerUi = require("swagger-ui-express");
const swaggerOutput = require("../swagger_output.json");
const passport = require("./config/passport.js");
const session = require("./config/session.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); //
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Session setup (required for Passport)
connectDB();
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", routes);

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Error Handling Middleware
app.use(errorMiddleware);

// Database Connection


module.exports = app;
