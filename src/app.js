// src/app.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database.js");
const routes = require("./routes/index.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("./config/swagger.js");
const passport = require("./config/passport.js");
const session = require("./config/session.js");
const logger = require("./utils/logger.js");

const app = express();

// Middleware
app.use(cors({
  origin: true, // Replace with your frontend URL in production
  credentials: true, // Allow credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Add this before routes to debug session issues
app.use((req, res, next) => {
  logger.debug('Session:', {
    id: req.sessionID,
    authenticated: req.isAuthenticated(),
    user: req.user?._id
  });
  next();
});

// Database Connection
connectDB();

// Static files
app.use(express.static("public"));

// Routes
// CHECK src/routes/index.js FOR MIDDLEWARE ERRORS
app.use("/", routes);

// Swagger Documentation with custom options
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Smart Farm API Documentation"
}));

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
