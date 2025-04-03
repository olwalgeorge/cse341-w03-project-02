// src/config/swagger.js
const swaggerAutogen = require("swagger-autogen");
const config = require("./config");
const logger = require("../utils/logger");
const { env,renderUrl } = config;

const outputFile = "../../swagger_output.json";
const endpointsFiles = ["../routes/index.js"];


let host = env === "production" ? renderUrl : "localhost:3000";
let schemes = env === "production" ? ["https"] : ["http"];

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
  .then(() => {
    logger.info("Swagger documentation generated");
    require("../server");
  })
  .catch((error) => {
    logger.error("Error generating Swagger documentation:", error);
  });
