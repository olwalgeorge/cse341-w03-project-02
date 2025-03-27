// src/routes/index.js
const express = require("express");
const userRoutes = require("./api/users.routes.js");
const sensorRoutes = require("./api/sensors.routes.js");

const router = express.Router();

/* #swagger.tags = ['API'] */
/* #swagger.description = 'Main API route' */

router.get("/", (req, res) => {
  res.send(`
        <h1>Welcome to the Smart Farm API</h1>
        <p>
            Please visit the <a href="/api-docs" target="_blank">Swagger documentation</a> for more information.
        </p>
    `);
});

router.use("/users", userRoutes);
router.use("/sensors", sensorRoutes);

module.exports = router;
