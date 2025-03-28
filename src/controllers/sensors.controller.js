// src/controllers/sensors.controller.js

const Sensor = require("../models/sensor.model.js");
const sendResponse = require("../utils/response.js");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const sensorService = require("../services/sensors.service.js"); // Import sensor service
const logger = require("../utils/logger.js"); // Import logger

// @desc    Get all sensors
// @route   GET /api/sensors
// @access  Private
const getSensors = asyncHandler(async (req, res) => {
  try {
    const sensors = await Sensor.find();
    sendResponse(res, 200, "Sensors retrieved successfully", sensors);
  } catch (error) {
    logger.error("Error retrieving sensors:", error);
    sendResponse(res, 500, "Failed to retrieve sensors", null, {
      message: error.message,
    });
  }
});

// @desc    Get a sensor by ID
// @route   GET /api/sensors/:id
// @access  Private
const getSensorById = asyncHandler(async (req, res) => {
  try {
    const sensor = await Sensor.findOne({ sensor_id: req.params.sensor_id });
    if (sensor) {
      sendResponse(res, 200, "Sensor retrieved successfully", sensor);
    } else {
      return sendResponse(res, 404, "Sensor not found");
    }
  } catch (error) {
    logger.error(
      `Error retrieving sensor with ID ${req.params.sensor_id}:`,
      error
    );
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return sendResponse(res, 400, "Invalid sensor ID format");
    }
    sendResponse(res, 500, "Failed to retrieve sensor", null, {
      message: error.message,
    });
  }
});

// @desc    Create a new sensor
// @route   POST /api/sensors
// @access  Private
const createSensor = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, "Validation error", null, errors.array());
  }

  try {
    const sensor = await Sensor.create(req.body);
    sendResponse(res, 201, "Sensor created successfully", sensor);
  } catch (error) {
    logger.error("Error creating sensor:", error);

    // Check for MongoDB duplicate key error (code 11000) for sensor_id
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.sensor_id
    ) {
      return sendResponse(res, 409, "Sensor ID already exists.", null, {
        message: "A sensor with this ID already exists.",
      });
    }

    // Handle other validation errors or database errors
    sendResponse(res, 500, "Failed to create sensor", null, {
      message: error.message,
    });
  }
});

// @desc    Update a sensor
// @route   PUT /api/sensors/:id
// @access  Private
const updateSensor = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, "Validation error", null, errors.array());
  }

  try {
    const sensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensure Mongoose validators run on update
    });

    if (sensor) {
      sendResponse(res, 200, "Sensor updated successfully", sensor);
    } else {
      return sendResponse(res, 404, "Sensor not found");
    }
  } catch (error) {
    logger.error(`Error updating sensor with ID ${req.params.id}:`, error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return sendResponse(res, 400, "Invalid sensor ID format");
    }
    sendResponse(res, 500, "Failed to update sensor", null, {
      message: error.message,
    });
  }
});

// @desc    Delete a sensor
// @route   DELETE /api/sensors/:id
// @access  Private
const deleteSensor = asyncHandler(async (req, res) => {
  try {
    const sensor = await Sensor.findByIdAndDelete(req.params.id);
    if (sensor) {
      sendResponse(res, 200, "Sensor deleted successfully");
    } else {
      return sendResponse(res, 404, "Sensor not found");
    }
  } catch (error) {
    logger.error(`Error deleting sensor with ID ${req.params.id}:`, error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return sendResponse(res, 400, "Invalid sensor ID format");
    }
    sendResponse(res, 500, "Failed to delete sensor", null, {
      message: error.message,
    });
  }
});

// @desc    Get sensors by type
// @route   GET /api/sensors/type/:sensor_type
// @access  Private
const getSensorsByType = asyncHandler(async (req, res) => {
  const { sensor_type } = req.params;
  try {
    const sensors = await sensorService.getSensorsByType(sensor_type);
    if (sensors && sensors.length > 0) {
      sendResponse(
        res,
        200,
        `Sensors of type ${sensor_type} retrieved successfully`,
        sensors
      );
    } else {
      return sendResponse(
        res,
        404,
        `No sensors found with type ${sensor_type}`
      );
    }
  } catch (error) {
    // Handle errors from the service
    logger.error(`Error retrieving sensors by type ${sensor_type}:`, error);
    return sendResponse(res, 500, "Error retrieving sensors", null, {
      message: error.message,
    });
  }
});

module.exports = {
  getSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
  getSensorsByType,
};
