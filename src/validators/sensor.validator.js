// src/validators/sensor.validator.js

const { check } = require("express-validator");
// const { isValidObjectId } = require("mongoose"); // Removed unused import as it's used via .isMongoId()

const sensorValidationRules = () => {
  return [
    check("sensor_name", "Sensor name is required").notEmpty(),
    check("sensor_type", "Sensor type is required").notEmpty(),
    check("sensor_type", "Invalid sensor type").isIn([
      "temperature",
      "humidity",
      "light",
      "soil moisture",
    ]),
    check("zone_id", "Zone ID is required").notEmpty(),
    check("zone_id")
      .isMongoId()
      .withMessage("Invalid Zone ID format"),
  ];
};

const sensorUpdateValidationRules = () => {
  return [
    check("sensor_name", "Sensor name is required").notEmpty(),
    check("sensor_type", "Sensor type is required").notEmpty(),
    check("sensor_type", "Invalid sensor type").isIn([
      "temperature",
      "humidity",
      "light",
      "soil moisture",
    ]),
   // zone id
    check("zone_id")
      .optional() // Make it optional for updates
      .isMongoId()
      .withMessage("Invalid Zone ID format"),
  ];
};

module.exports = { sensorValidationRules, sensorUpdateValidationRules };