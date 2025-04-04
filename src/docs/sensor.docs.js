module.exports = {
  '/sensors': {
    get: {
      tags: ['Sensors'],
      summary: 'Get all sensors',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of sensors retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Sensor'
                }
              }
            }
          }
        },
        401: { $ref: '#/components/responses/UnauthorizedError' },
        500: { $ref: '#/components/responses/ServerError' }
      }
    },
    post: {
      tags: ['Sensors'],
      summary: 'Create new sensor',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Sensor'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Sensor created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Success'
              }
            }
          }
        },
        400: { $ref: '#/components/responses/ValidationError' },
        401: { $ref: '#/components/responses/UnauthorizedError' },
        409: {
          description: 'Duplicate sensor ID',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' }
            }
          }
        },
        500: { $ref: '#/components/responses/ServerError' }
      }
    }
  },
  '/sensors/{sensor_id}': {
    get: {
      tags: ['Sensors'],
      summary: 'Get sensor by ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'sensor_id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            pattern: '^sen_\\d{4}$'
          },
          description: 'Sensor ID in sen_XXXX format'
        }
      ],
      responses: {
        200: {
          description: 'Sensor retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Success'
              }
            }
          }
        },
        404: { $ref: '#/components/responses/NotFoundError' },
        401: { $ref: '#/components/responses/UnauthorizedError' },
        400: {
          description: 'Invalid sensor ID format',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' }
            }
          }
        },
        500: { $ref: '#/components/responses/ServerError' }
      }
    }
  },
  '/sensors/type/{sensor_type}': {
    get: {
      tags: ['Sensors'],
      summary: 'Get sensors by type',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'sensor_type',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            enum: ['temperature', 'humidity', 'light', 'soil moisture']
          },
          description: 'Type of sensor'
        }
      ],
      responses: {
        200: {
          description: 'Sensors retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Sensor'
                }
              }
            }
          }
        },
        404: { $ref: '#/components/responses/NotFoundError' },
        401: { $ref: '#/components/responses/UnauthorizedError' }
      }
    }
  },
  '/sensors/{_id}': {
    put: {
      tags: ['Sensors'],
      summary: 'Update sensor',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: '_id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'MongoDB ID of the sensor'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Sensor' }
          }
        }
      },
      responses: {
        200: {
          description: 'Sensor updated successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        },
        400: { $ref: '#/components/responses/ValidationError' },
        401: { $ref: '#/components/responses/UnauthorizedError' },
        404: { $ref: '#/components/responses/NotFoundError' },
        500: { $ref: '#/components/responses/ServerError' },
        409: {
          description: 'Duplicate sensor ID',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Sensors'],
      summary: 'Delete sensor',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: '_id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$'
          },
          description: 'MongoDB ObjectId of the sensor'
        }
      ],
      responses: {
        200: {
          description: 'Sensor deleted successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        },
        401: { $ref: '#/components/responses/UnauthorizedError' },
        404: { $ref: '#/components/responses/NotFoundError' },
        500: { $ref: '#/components/responses/ServerError' }
      }
    }
  }
};

