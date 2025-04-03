// src/config/swagger.js
const swaggerAutogen = require('swagger-autogen')();
const config = require('./config');
const logger = require('../utils/logger');

const outputFile = '../../swagger_output.json'; 
const endpointsFiles = ['./src/routes/index.js']; 

const doc = {
  info: {
    title: 'Smart Farm API',
    description: 'API for a smart farm application',
  },
  host: config.env === 'production' && config.renderUrl ? config.renderUrl : 'localhost:3000',
  schemes: [config.env === 'production' ? 'https' : 'http'],
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

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../server'); 
}).catch((err) => {
  logger.error(err);
});

