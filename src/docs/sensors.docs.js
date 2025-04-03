/**
 * @swagger
 * tags:
 *   name: Sensors
 *   description: Sensor management endpoints for IoT devices and measurements
 */

/**
 * @swagger
 * /sensors:
 *   get:
 *     summary: Get all sensors
 *     description: Retrieves all sensors in the system
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sensors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sensors retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sensor_id:
 *                         type: string
 *                         example: 'sen_0001'
 *                       sensor_name:
 *                         type: string
 *                         example: 'Greenhouse Temperature'
 *                       sensor_type:
 *                         type: string
 *                         example: 'temperature'
 *                       unit:
 *                         type: string
 *                         example: '°C'
 *                       location:
 *                         type: string
 *                         example: 'Greenhouse Zone A'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve sensors
 */

/**
 * @swagger
 * /sensors/{sensor_id}:
 *   get:
 *     summary: Get sensor by ID
 *     description: Retrieves a specific sensor by its sen_XXXX format ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sensor_id
 *         description: Sensor ID in sen_XXXX format
 *         required: true
 *         schema:
 *           type: string
 *         example: 'sen_0001'
 *     responses:
 *       200:
 *         description: Sensor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sensor retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     sensor_id:
 *                       type: string
 *                       example: 'sen_0001'
 *                     sensor_name:
 *                       type: string
 *                       example: 'Greenhouse Temperature'
 *                     sensor_type:
 *                       type: string
 *                       example: 'temperature'
 *                     unit:
 *                       type: string
 *                       example: '°C'
 *                     location:
 *                       type: string
 *                       example: 'Greenhouse Zone A'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       404:
 *         description: Sensor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Sensor not found
 *       400:
 *         description: Invalid sensor ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid sensor ID format
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve sensor
 */

/**
 * @swagger
 * /sensors:
 *   post:
 *     summary: Create new sensor
 *     description: Creates a new sensor in the system
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sensor_id
 *               - sensor_name
 *               - sensor_type
 *             properties:
 *               sensor_id:
 *                 type: string
 *                 example: 'sen_0001'
 *                 description: Unique sensor ID (format: sen_XXXX)
 *               sensor_name:
 *                 type: string
 *                 example: 'Greenhouse Temperature'
 *               sensor_type:
 *                 type: string
 *                 enum: ['temperature', 'humidity', 'light', 'soil moisture']
 *               unit:
 *                 type: string
 *                 example: '°C'
 *               location:
 *                 type: string
 *                 example: 'Greenhouse Zone A'
 *     responses:
 *       201:
 *         description: Sensor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sensor created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     sensor_id:
 *                       type: string
 *                       example: 'sen_0001'
 *                     sensor_name:
 *                       type: string
 *                       example: 'Greenhouse Temperature'
 *                     sensor_type:
 *                       type: string
 *                       example: 'temperature'
 *                     unit:
 *                       type: string
 *                       example: '°C'
 *                     location:
 *                       type: string
 *                       example: 'Greenhouse Zone A'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       409:
 *         description: Duplicate sensor ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Duplicate sensor ID
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to create sensor
 */

/**
 * @swagger
 * /sensors/{_id}:
 *   put:
 *     summary: Update sensor
 *     description: Updates an existing sensor's information by MongoDB _id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         description: MongoDB _id of the sensor
 *         required: true
 *         schema:
 *           type: string
 *         example: '507f1f77bcf86cd799439011'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sensor_name:
 *                 type: string
 *                 example: 'Updated Temperature Sensor'
 *               unit:
 *                 type: string
 *                 example: '°F'
 *               location:
 *                 type: string
 *                 example: 'Greenhouse Zone B'
 *     responses:
 *       200:
 *         description: Sensor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sensor updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '507f1f77bcf86cd799439011'
 *                     sensor_id:
 *                       type: string
 *                       example: 'sen_0001'
 *                     sensor_name:
 *                       type: string
 *                       example: 'Updated Temperature Sensor'
 *                     sensor_type:
 *                       type: string
 *                       example: 'temperature'
 *                     unit:
 *                       type: string
 *                       example: '°F'
 *                     location:
 *                       type: string
 *                       example: 'Greenhouse Zone B'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       404:
 *         description: Sensor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Sensor not found
 *       409:
 *         description: Duplicate sensor ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Duplicate sensor ID
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to update sensor
 */

/**
 * @swagger
 * /sensors/{_id}:
 *   delete:
 *     summary: Delete sensor
 *     description: Permanently removes a sensor from the system by MongoDB _id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         description: MongoDB _id of the sensor to delete
 *         required: true
 *         schema:
 *           type: string
 *         example: '507f1f77bcf86cd799439011'
 *     responses:
 *       200:
 *         description: Sensor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sensor deleted successfully
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       404:
 *         description: Sensor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Sensor not found
 *       400:
 *         description: Invalid sensor ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid sensor ID format
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to delete sensor
 */

/**
 * @swagger
 * /sensors/type/{sensor_type}:
 *   get:
 *     summary: Get sensors by type
 *     description: Retrieves all sensors of a specific type (temperature, humidity, light, or soil moisture)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sensor_type
 *         description: Type of sensor to filter by
 *         required: true
 *         schema:
 *           type: string
 *           enum: ['temperature', 'humidity', 'light', 'soil moisture']
 *     responses:
 *       200:
 *         description: Sensors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sensors retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sensor_id:
 *                         type: string
 *                         example: 'sen_0001'
 *                       sensor_name:
 *                         type: string
 *                         example: 'Greenhouse Temperature'
 *                       sensor_type:
 *                         type: string
 *                         example: 'temperature'
 *                       unit:
 *                         type: string
 *                         example: '°C'
 *                       location:
 *                         type: string
 *                         example: 'Greenhouse Zone A'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       404:
 *         description: No sensors found with type ${sensor_type}
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No sensors found with type ${sensor_type}
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error retrieving sensors
 */
