// src/validators/sensor.validator.js

const { check, param } = require("express-validator");

const sensorValidateIdRules = () => {
  return [    
    param("_id", "Invalid internal Sensor ID format").isMongoId(),
  ];
};

const sensorValidateSensorIdRules = () => {
  return [    
    param("sensor_id", "Sensor ID should start with 'sen_' then 4 digits").matches(/^sen_\d{4}$/),
  ];
};

const sensorValidateSensorTypeRules = () => {
  return [
    param("sensor_type", "Invalid sensor type").isIn([
      "temperature",
      "humidity",
      "light",
      "soil moisture",
    ]),
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
    ...sensorValidateIdRules(),
    check("sensor_id", "Sensor ID is required").optional(),
    check(
      "sensor_id",
      "Sensor ID should start with 'sen_' then 4 digits"
    ).optional().matches(/^sen_\d{4}$/),
    check("sensor_name", "Sensor name is required").optional(),
    check("sensor_type", "Sensor type is required").optional(),
    check("sensor_type", "Invalid sensor type").optional().isIn([
      "temperature",
      "humidity",
      "light",
      "soil moisture",
    ]),
    check("unit", "Unit is required").optional(),
    check("location", "Location is required").optional(),
  ];
};

module.exports = {
  sensorValidateIdRules,
  sensorValidateSensorIdRules,
  sensorCreateValidationRules,
  sensorUpdateValidationRules,
  sensorValidateSensorTypeRules,
};
