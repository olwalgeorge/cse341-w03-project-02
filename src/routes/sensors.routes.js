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

/* 
#swagger.tags = ['Sensors']
#swagger.description = 'Sensor management endpoints for IoT devices and measurements'
*/

router.get(
  "/",
  isAuthenticated,
  /* #swagger.tags = ['Sensors']
     #swagger.summary = 'Get all sensors'
     #swagger.description = 'Retrieves all sensors in the system'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.responses[200] = {
       description: 'Sensors retrieved successfully',
       schema: {
         success: true,
         message: 'Sensors retrieved successfully',
         data: [{
           sensor_id: 'sen_0001',
           sensor_name: 'Greenhouse Temperature',
           sensor_type: 'temperature',
           unit: '°C',
           location: 'Greenhouse Zone A'
         }]
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to retrieve sensors' }
     }
  */
  getSensors
);

router.get(
  "/:sensor_id",
  isAuthenticated,
  validate(sensorValidateSensorIdRules()),
  /* #swagger.tags = ['Sensors']
     #swagger.summary = 'Get sensor by ID'
     #swagger.description = 'Retrieves a specific sensor by its sen_XXXX format ID'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['sensor_id'] = {
       in: 'path',
       description: 'Sensor ID in sen_XXXX format',
       required: true,
       type: 'string',
       example: 'sen_0001'
     }
     #swagger.responses[200] = {
       description: 'Sensor retrieved successfully',
       schema: {
         success: true,
         message: 'Sensor retrieved successfully',
         data: {
           sensor_id: 'sen_0001',
           sensor_name: 'Greenhouse Temperature',
           sensor_type: 'temperature',
           unit: '°C',
           location: 'Greenhouse Zone A'
         }
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[404] = {
       description: 'Sensor not found',
       schema: { success: false, message: 'Sensor not found' }
     }
     #swagger.responses[400] = {
       description: 'Invalid sensor ID format',
       schema: { success: false, message: 'Invalid sensor ID format' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to retrieve sensor' }
     }
  */
  getSensorById
);

router.post(
  "/",
  isAuthenticated,
  validate(sensorCreateValidationRules()),
  /* #swagger.tags = ['Sensors']
     #swagger.summary = 'Create new sensor'
     #swagger.description = 'Creates a new sensor in the system'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Sensor data',
       required: true,
       schema: {
         type: 'object',
         required: ['sensor_id', 'sensor_name', 'sensor_type'],
         properties: {
           sensor_id: {
             type: 'string',
             example: 'sen_0001',
             description: 'Unique sensor ID (format: sen_XXXX)'
           },
           sensor_name: {
             type: 'string',
             example: 'Greenhouse Temperature'
           },
           sensor_type: {
             type: 'string',
             enum: ['temperature', 'humidity', 'light', 'soil moisture']
           },
           unit: {
             type: 'string',
             example: '°C'
           },
           location: {
             type: 'string',
             example: 'Greenhouse Zone A'
           }
         }
       }
     }
     #swagger.responses[201] = {
       description: 'Sensor created successfully',
       schema: {
         success: true,
         message: 'Sensor created successfully',
         data: {
           sensor_id: 'sen_0001',
           sensor_name: 'Greenhouse Temperature',
           sensor_type: 'temperature',
           unit: '°C',
           location: 'Greenhouse Zone A'
         }
       }
     }
     #swagger.responses[400] = {
       description: 'Validation error',
       schema: { success: false, message: 'Validation error' }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[409] = {
       description: 'Duplicate sensor ID',
       schema: { success: false, message: 'Duplicate sensor ID' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to create sensor' }
     }
  */
  createSensor
);

router.put(
  "/:_id",
  isAuthenticated,
  validate(sensorUpdateValidationRules()),
  /* #swagger.tags = ['Sensors']
     #swagger.summary = 'Update sensor'
     #swagger.description = 'Updates an existing sensor\'s information by MongoDB _id'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['_id'] = {
       in: 'path',
       description: 'MongoDB _id of the sensor',
       required: true,
       type: 'string',
       example: '507f1f77bcf86cd799439011'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated sensor information',
       required: true,
       schema: {
         type: 'object',
         properties: {
           sensor_name: {
             type: 'string',
             example: 'Updated Temperature Sensor'
           },
           unit: {
             type: 'string',
             example: '°F'
           },
           location: {
             type: 'string',
             example: 'Greenhouse Zone B'
           }
         }
       }
     }
     #swagger.responses[200] = {
       description: 'Sensor updated successfully',
       schema: {
         success: true,
         message: 'Sensor updated successfully',
         data: {
           _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
           sensor_id: 'sen_0001',
           sensor_name: 'Updated Temperature Sensor',
           sensor_type: 'temperature',
           unit: '°F',
           location: 'Greenhouse Zone B'
         }
       }
     }
     #swagger.responses[400] = {
       description: 'Validation error',
       schema: { success: false, message: 'Validation error' }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[404] = {
       description: 'Sensor not found',
       schema: { success: false, message: 'Sensor not found' }
     }
     #swagger.responses[409] = {
       description: 'Duplicate sensor ID',
       schema: { success: false, message: 'Duplicate sensor ID' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to update sensor' }
     }
  */
  updateSensor
);

router.delete(
  "/:_id",
  isAuthenticated,
  validate(sensorValidateIdRules()),
  /* #swagger.tags = ['Sensors']
     #swagger.summary = 'Delete sensor'
     #swagger.description = 'Permanently removes a sensor from the system by MongoDB _id'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['_id'] = {
       in: 'path',
       description: 'MongoDB _id of the sensor to delete',
       required: true,
       type: 'string',
       example: '507f1f77bcf86cd799439011'
     }
     #swagger.responses[200] = {
       description: 'Sensor deleted successfully',
       schema: {
         success: true,
         message: 'Sensor deleted successfully'
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[404] = {
       description: 'Sensor not found',
       schema: { success: false, message: 'Sensor not found' }
     }
     #swagger.responses[400] = {
       description: 'Invalid sensor ID format',
       schema: { success: false, message: 'Invalid sensor ID format' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Failed to delete sensor' }
     }
  */
  deleteSensor
);

router.get(
  "/type/:sensor_type",
  isAuthenticated,
  validate(sensorValidateSensorTypeRules()),
  /* #swagger.tags = ['Sensors']
     #swagger.summary = 'Get sensors by type'
     #swagger.description = 'Retrieves all sensors of a specific type (temperature, humidity, light, or soil moisture)'
     #swagger.security = [{ "bearerAuth": [] }]
     #swagger.parameters['sensor_type'] = {
       in: 'path',
       description: 'Type of sensor to filter by',
       required: true,
       type: 'string',
       enum: ['temperature', 'humidity', 'light', 'soil moisture']
     }
     #swagger.responses[200] = {
       description: 'Sensors retrieved successfully',
       schema: {
         success: true,
         message: 'Sensors retrieved successfully',
         data: [{
           sensor_id: 'sen_0001',
           sensor_name: 'Greenhouse Temperature',
           sensor_type: 'temperature',
           unit: '°C',
           location: 'Greenhouse Zone A'
         }]
       }
     }
     #swagger.responses[401] = {
       description: 'Not authenticated',
       schema: { success: false, message: 'Not authenticated' }
     }
     #swagger.responses[404] = {
       description: 'No sensors found with type ${sensor_type}',
       schema: { success: false, message: 'No sensors found with type ${sensor_type}' }
     }
     #swagger.responses[500] = {
       description: 'Internal server error',
       schema: { success: false, message: 'Error retrieving sensors' }
     }
  */
  getSensorsByType
);

module.exports = router;
