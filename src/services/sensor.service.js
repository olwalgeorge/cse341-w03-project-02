const Sensor = require("../models/sensor.model.js");


class SensorService {
    async getAllSensors() {
        return await Sensor.find();
    }

    async getSensorById(sensorId) {
        return await Sensor.findOne({ sensor_id: sensorId });
    }

    async createSensor(sensorData) {
        return await Sensor.create(sensorData);
    }

    async updateSensor(id, updates) {
        return await Sensor.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });
    }

    async deleteSensor(id) {
        return await Sensor.findByIdAndDelete(id);
    }

    async getSensorsByType(type) {
        return await Sensor.find({ sensor_type: type });
    }

    async deleteAllSensors() {
        return await Sensor.deleteMany();
    }
}

module.exports = new SensorService();
