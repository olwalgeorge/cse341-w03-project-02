// src/validators/sensor.validator.js

const { check, param } = require("express-validator");

const sensorValidateIdRules = () => {
  return [
    check("_id").isMongoId().withMessage("Invalid internal Sensor ID format"),
  ];
};

const sensorValidateSensorIdRules = () => {
  return [
    param("sensor_id", "Invalid sensor ID format").matches(/^sen_\d{4}$/),
  ];
};

const sensorCreateValidationRules = () => {
  return [
    check("sensor_id", "Sensor ID is required").notEmpty(),
    check(
      "sensor_id",
      "Sensor ID should start with 'sen_' then 4 digits"
    ).matches(/^sen_\d{4}$/),
    check("sensor_name", "Sensor name is required").notEmpty(),
    check("sensor_type", "Sensor type is required").notEmpty(),
    check("sensor_type", "Invalid sensor type").isIn([
      "temperature",
      "humidity",
      "light",
      "soil moisture",
    ]),
    check("unit", "Unit is required").notEmpty(),
    check("location", "Location is required").notEmpty(),
  ];
};

const sensorUpdateValidationRules = () => {
  return [
    check("_id").isMongoId().withMessage("Invalid internal Sensor ID format"),
    check("sensor_id", "Sensor ID is required").notEmpty(),
    check(
      "sensor_id",
      "Sensor ID should start with 'sen_' then 4 digits"
    ).matches(/^sen_\d{4}$/),
    check("sensor_name", "Sensor name is required").notEmpty(),
    check("sensor_type", "Sensor type is required").notEmpty(),
    check("sensor_type", "Invalid sensor type").isIn([
      "temperature",
      "humidity",
      "light",
      "soil moisture",
    ]),
    check("unit", "Unit is required").notEmpty(),
    check("location", "Location is required").notEmpty(),
  ];
};

module.exports = {
  sensorValidateIdRules,
  sensorValidateSensorIdRules,
  sensorCreateValidationRules,
  sensorUpdateValidationRules,
};
