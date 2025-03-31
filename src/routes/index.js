// src/routes/index.js
const express = require("express");
const userRoutes = require("./users.routes.js");
const authRoutes = require("./auth.routes.js");
const sensorRoutes = require("./sensors.routes.js");

const router = express.Router();

/* #swagger.tags = [''] */
/* #swagger.description = 'Main  route' */

router.get("/", (req, res) => {
  res.send(`
        <h1>Welcome to the Smart Farm </h1>
        <p>
            Please visit the <a href="/-docs" target="_blank">Swagger documentation</a> for more information.
        </p>
    `);
});
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/sensors", sensorRoutes);

module.exports = router;
