// src/validators/sensor.validator.js
const { check } = require("express-validator");

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
    check("zone_id", "Invalid Zone ID").isMongoId(), // Validate if it's a valid MongoDB ObjectId
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
  ];
};

module.exports = { sensorValidationRules, sensorUpdateValidationRules };
