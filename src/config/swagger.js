// src/config/swagger.js
const swaggerAutogen = require("swagger-autogen");
const config = require("./config");
const logger = require("../utils/logger");

const outputFile = "../../swagger_output.json";
const endpointsFiles = ["../routes/index.js"];

let host = "localhost:3000/api"; // Default for development
let schemes = ["http"]; // Default for development

if (config.env === "production") {
  host = "smart-farm-api.onrender.com";
  schemes = ["https"];
}

const doc = {
  info: {
    title: "Smart Farm API",
    description: "API documentation for the Smart Farm project",
  },
  host: host,
  schemes: schemes,
};

// Generate Swagger file on startup then run server
swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => require("../server"))
  .catch((error) => {
    logger.error("Error generating Swagger documentation:", error);
  });
