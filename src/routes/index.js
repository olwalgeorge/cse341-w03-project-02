// src/routes/index.js
const express = require("express");
const userRoutes = require("./users.routes.js");
const sensorRoutes = require("./sensors.routes.js");

const router = express.Router();

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
