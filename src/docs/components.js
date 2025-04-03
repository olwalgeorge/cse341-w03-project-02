module.exports = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  schemas: {
    Error: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false
        },
        message: {
          type: 'string'
        },
        error: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    },
    Success: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: true
        },
        message: {
          type: 'string'
        },
        data: {
          type: 'object'
        }
      }
    },
    User: {
      type: 'object',
      properties: {
        userID: {
          type: 'string',
          pattern: '^SM-\\d{5}$',
          example: 'SM-00001'
        },
        username: {
          type: 'string',
          example: 'john_doe'
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'john.doe@example.com'
        },
        fullName: {
          type: 'string',
          example: 'John Doe'
        },
        role: {
          type: 'string',
          enum: ['SUPERADMIN', 'ADMIN', 'USER', 'ORG']
        }
      }
    },
    Sensor: {
      type: 'object',
      properties: {
        sensor_id: {
          type: 'string',
          pattern: '^sen_\\d{4}$',
          example: 'sen_0001'
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
  },
  responses: {
    UnauthorizedError: {
      description: 'Access token is missing or invalid',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          }
        }
      }
    },
    NotFoundError: {
      description: 'The specified resource was not found',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          }
        }
      }
    },
    ValidationError: {
      description: 'Validation error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          }
        }
      }
    },
    ServerError: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          }
        }
      }
    }
  }
};
