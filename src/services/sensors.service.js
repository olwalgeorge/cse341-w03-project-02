// src/services/sensors.service.js
// This file can contain more complex sensor-related logic
// that is not directly tied to request handling.

const Sensor = require("../models/sensor.model.js");
const logger = require("../utils/logger.js");

// Example: Get sensors by type
const getSensorsByType = async (sensorType) => {
  try {
    const sensors = await Sensor.find({ sensor_type: sensorType });
    return sensors;
  } catch (error) {
    logger.error("Error getting sensors by type:", error);
    throw error;
  }
};

// Add other sensor-related service functions here (e.g.,
// - Calculating average sensor readings
// - Filtering sensor data
// - Processing sensor data for specific use cases)

module.exports = {
  getSensorsByType,
  // ... other service functions
};
