// src/routes/index.js
const express = require("express");
const userRoutes = require("./users.routes.js");
const authRoutes = require("./auth.routes.js");
const sensorRoutes = require("./sensors.routes.js");
const path = require('path');

const router = express.Router();

/* #swagger.tags = [''] */
/* #swagger.description = 'Main  route' */

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html')); 
});
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/sensors", sensorRoutes);

module.exports = router;
