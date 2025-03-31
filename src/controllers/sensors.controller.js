const Sensor = require("../models/sensor.model.js");
const sendResponse = require("../utils/response.js");
const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger.js");

// @desc    Get all sensors
// @route   GET //sensors
// @access  Private
const getSensors = asyncHandler(async (req, res) => {
  logger.info("getSensors called");
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
// @route   GET //sensors/:id
// @access  Private
const getSensorById = asyncHandler(async (req, res) => {
  logger.info(`getSensorById called with ID ${req.params.sensor_id}`);
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
// @route   POST //sensors
// @access  Private
const createSensor = asyncHandler(async (req, res) => {
  logger.info("createSensor called");

  try {
    const sensor = await Sensor.create(req.body);
    sendResponse(res, 201, "Sensor created successfully", sensor);
  } catch (error) {
    logger.error("Error creating sensor:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return sendResponse(res, 400, "Validation error", null, {
        message: errors.join(". "),
      });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return sendResponse(res, 409, `Duplicate ${field}`, null, {
        message: `${field} '${value}' already exists`,
      });
    }
    sendResponse(res, 500, "Failed to create sensor", null, {
      message: error.message,
    });
  }
});

// @desc    Update a sensor
// @route   PUT //sensors/:id
// @access  Private
const updateSensor = asyncHandler(async (req, res) => {
  logger.info(`updateSensor called with ID ${req.params._id}`);

  try {
    const sensor = await Sensor.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true, // Ensure Mongoose validators run on update
    });
    sendResponse(res, 200, "Sensor updated successfully", sensor);
  } catch (error) {
    logger.error(`Error updating sensor with ID ${req.params._id}:`, error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((val) => val.message);
      return sendResponse(res, 400, "Validation error", null, {
        message: errors.join(". "),
      });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return sendResponse(res, 409, `Duplicate ${field}`, null, {
        message: `${field} '${value}' already exists`,
      });
    }
    sendResponse(res, 500, "Failed to update sensor", null, {
      message: error.message,
    });
  }
});

// @desc    Delete a sensor
// @route   DELETE //sensors/:id
// @access  Private
const deleteSensor = asyncHandler(async (req, res) => {
  logger.info(`deleteSensor called with ID ${req.params.id}`);
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

// @desc    Delete all sensors
// @route   DELETE //sensors
// @access  Private
const deleteAllSensors = asyncHandler(async (req, res) => {
  logger.info("deleteAllSensors called");
  try {
    const sensors = await Sensor.deleteMany();
    if (sensors) {
      sendResponse(res, 200, "All sensors deleted successfully");
    } else {
      return sendResponse(res, 404, "No sensors found");
    }
  } catch (error) {
    logger.error("Error deleting all sensors:", error);
    sendResponse(res, 500, "Failed to delete all sensors", null, {
      message: error.message,
    });
  }
});

// @desc    Get sensors by type
// @route   GET //sensors/type/:sensor_type
// @access  Private
const getSensorsByType = asyncHandler(async (req, res) => {
  const { sensor_type } = req.params;
  logger.info(`getSensorsByType called with type ${sensor_type}`);
  try {
    const sensors = await Sensor.find({ sensor_type });
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
  deleteAllSensors,
  getSensorsByType,
};
