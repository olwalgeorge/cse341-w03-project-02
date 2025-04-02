const User = require("../models/user.model.js");

class UserService {
    async getUserById(id) {
        return await User.findById(id);
    }

    async getUserByUserId(userId) {
        return await User.findOne({ userID: userId });
    }

    async updateUserById(id, updates) {
        return await User.findByIdAndUpdate(id, updates, { 
            new: true, 
            runValidators: true 
        });
    }

    async deleteUserById(id) {
        return await User.findByIdAndDelete(id);
    }

    async getAllUsers() {
        return await User.find();
    }

    async getUserByUsername(username) {
        return await User.findOne({ username: username.toLowerCase() });
    }

    async getUserByEmail(email) {
        return await User.findOne({ email: email.toLowerCase() });
    }

    async getUsersByRole(role) {
        return await User.find({ role: role.toUpperCase() });
    }

    async deleteAllUsers() {
        return await User.deleteMany();
    }
}

module.exports = new UserService();
