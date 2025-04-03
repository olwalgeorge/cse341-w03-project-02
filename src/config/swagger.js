// src/config/swagger.js
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js']; // Entry point to your routes
// const endpointsFiles = ['./src/routes/users.routes.js', './src/routes/sensors.routes.js']; // previous

const doc = {
  info: {
    title: 'Smart Farm API',
    description: 'API for a smart farm application',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    {
      name: 'Users',
      description: 'Endpoints related to user management',
    },
    {
      name: 'Sensors',
      description: 'Endpoints related to sensor management',
    },
    {
      name: 'Authentication',
      description: 'Endpoints related to user authentication',
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc);

