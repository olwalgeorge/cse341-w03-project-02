// src/controllers/sensors.controller.js
const Sensor = require("../models/sensor.model.js");
const sendResponse = require("../utils/response.js");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const sensorService = require("../services/sensors.service.js"); // Import sensor service

// @desc    Get all sensors
// @route   GET /api/sensors
// @access  Private
const getSensors = asyncHandler(async (req, res) => {
  const sensors = await Sensor.find();
  sendResponse(res, 200, "Sensors retrieved successfully", sensors);
});

// @desc    Get a sensor by ID
// @route   GET /api/sensors/:id
// @access  Private
const getSensorById = asyncHandler(async (req, res) => {
  const sensor = await Sensor.findById(req.params.id);
  if (sensor) {
    sendResponse(res, 200, "Sensor retrieved successfully", sensor);
  } else {
    return sendResponse(res, 404, "Sensor not found");
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

  const sensor = await Sensor.create(req.body);
  sendResponse(res, 201, "Sensor created successfully", sensor);
});

// @desc    Update a sensor
// @route   PUT /api/sensors/:id
// @access  Private
const updateSensor = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, "Validation error", null, errors.array());
  }

  const sensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, // Ensure Mongoose validators run on update
  });

  if (sensor) {
    sendResponse(res, 200, "Sensor updated successfully", sensor);
  } else {
    return sendResponse(res, 404, "Sensor not found");
  }
});

// @desc    Delete a sensor
// @route   DELETE /api/sensors/:id
// @access  Private
const deleteSensor = asyncHandler(async (req, res) => {
  const sensor = await Sensor.findByIdAndDelete(req.params.id);
  if (sensor) {
    sendResponse(res, 200, "Sensor deleted successfully");
  } else {
    return sendResponse(res, 404, "Sensor not found");
  }
});

// @desc    Get sensors by type
// @route   GET /api/sensors/type/:sensor_type
// @access  Private
const getSensorsByType = asyncHandler(async (req, res) => {
  const { sensor_type } = req.params;
  try {
    const sensors = await sensorService.getSensorsByType(sensor_type);
    sendResponse(
      res,
      200,
      `Sensors of type ${sensor_type} retrieved successfully`,
      sensors
    );
  } catch (error) {
    // Handle errors from the service
    return sendResponse(res, 500, "Error retrieving sensors", null, error);
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
