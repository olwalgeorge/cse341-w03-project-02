// src/routes/sensors.routes.js
const express = require("express");
const {
  getSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
  getSensorsByType,
} = require("../../controllers/sensors.controller.js");
const validate = require("../../middlewares/validation.middleware.js");
const protect = require("../../middlewares/auth.middleware.js");
const {
  sensorValidationRules,
  sensorUpdateValidationRules,
} = require("../../validators/sensor.validator.js");

const router = express.Router();

/* #swagger.tags = ['Sensors'] */
/* #swagger.description = 'Routes for managing sensors' */

router.get(
  "/",
  protect,
  /* #swagger.tags = ['Sensors'] */
  /* #swagger.description = 'Endpoint to retrieve all sensors' */
  /* #swagger.responses[200] = { description: 'Sensors retrieved successfully' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve sensors' } */
  getSensors
);

router.get(
  "/:id",
  protect,
  /* #swagger.tags = ['Sensors'] */
  /* #swagger.description = 'Endpoint to retrieve a sensor by id' */
  /* #swagger.parameters['id'] = { in: 'path', description: 'Sensor ID', required: true, type: 'string' } */
  /* #swagger.responses[200] = { description: 'Sensor retrieved successfully' } */
  /* #swagger.responses[404] = { description: 'Sensor not found' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve sensor' } */
  getSensorById
);

router.post(
  "/",
  protect,
  validate(sensorValidationRules()),
  /* #swagger.tags = ['Sensors'] */
  /* #swagger.description = 'Endpoint to create a new sensor' */
  /* #swagger.requestBody = { required: true, description: 'Sensor data to create a new sensor', schema: { $ref: '#/definitions/Sensor' } } */
  /* #swagger.responses[201] = { description: 'Sensor created successfully' } */
  /* #swagger.responses[400] = { description: 'Validation error' } */
  /* #swagger.responses[500] = { description: 'Failed to create sensor' } */
  createSensor
);

router.put(
  "/:id",
  protect,
  validate(sensorUpdateValidationRules()),
  /* #swagger.tags = ['Sensors'] */
  /* #swagger.description = 'Endpoint to update a sensor' */
  /* #swagger.parameters['id'] = { in: 'path', description: 'Sensor ID', required: true, type: 'string' } */
  /* #swagger.requestBody = { required: true, description: 'Sensor data to update a sensor', schema: { $ref: '#/definitions/Sensor' } } */
  /* #swagger.responses[200] = { description: 'Sensor updated successfully' } */
  /* #swagger.responses[400] = { description: 'Validation error' } */
  /* #swagger.responses[404] = { description: 'Sensor not found' } */
  /* #swagger.responses[500] = { description: 'Failed to update sensor' } */
  updateSensor
);

router.delete(
  "/:id",
  protect,
  /* #swagger.tags = ['Sensors'] */
  /* #swagger.description = 'Endpoint to delete a sensor' */
  /* #swagger.parameters['id'] = { in: 'path', description: 'Sensor ID', required: true, type: 'string' } */
  /* #swagger.responses[200] = { description: 'Sensor deleted successfully' } */
  /* #swagger.responses[404] = { description: 'Sensor not found' } */
  /* #swagger.responses[500] = { description: 'Failed to delete sensor' } */
  deleteSensor
);

router.get(
  "/type/:sensor_type",
  protect,
  /* #swagger.tags = ['Sensors'] */
  /* #swagger.description = 'Endpoint to retrieve sensors by type' */
  /* #swagger.parameters['sensor_type'] = { in: 'path', description: 'Sensor type', required: true, type: 'string', enum: ['temperature', 'humidity', 'light', 'soil moisture'] } */
  /* #swagger.responses[200] = { description: 'Sensors retrieved successfully' } */
  /* #swagger.responses[404] = { description: 'Sensors not found' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve sensors' } */
  getSensorsByType
);

module.exports = router;


