// src/routes/sensors.routes.js

const express = require("express");

const {
  getSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
  getSensorsByType,
} = require("../controllers/sensors.controller.js");
const validate = require("../middlewares/validation.middleware.js");
const isAuthenticated = require("../middlewares/auth.middleware.js");
const {
  sensorValidateIdRules,
  sensorValidateSensorIdRules,
  sensorCreateValidationRules,
  sensorUpdateValidationRules,
  sensorValidateSensorTypeRules,
} = require("../validators/sensor.validator.js");

const router = express.Router();

router.get("/", isAuthenticated, getSensors);

router.get(
  "/:sensor_id",
  isAuthenticated,
  validate(sensorValidateSensorIdRules()),
  getSensorById
);

router.post(
  "/",
  isAuthenticated,
  validate(sensorCreateValidationRules()),
  createSensor
);

router.put(
  "/:_id",
  isAuthenticated,
  validate(sensorUpdateValidationRules()),
  updateSensor
);

router.delete(
  "/:_id",
  isAuthenticated,
  validate(sensorValidateIdRules()),
  deleteSensor
);

router.get(
  "/type/:sensor_type",
  isAuthenticated,
  validate(sensorValidateSensorTypeRules()),
  getSensorsByType
);

module.exports = router;
