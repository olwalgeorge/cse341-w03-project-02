// src/models/sensor.model.js
const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  sensor_name: {
    type: String,
    required: [true, 'Sensor name is required'],
    trim: true,
  },
  sensor_type: {
    type: String,
    required: [true, 'Sensor type is required'],
    enum: ['temperature', 'humidity', 'light', 'soil moisture'], 
    trim: true,
  },
  unit: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  zone_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone',
    required: [true, 'Zone ID is required'],
  },
}, {
  timestamps: true,
});

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
