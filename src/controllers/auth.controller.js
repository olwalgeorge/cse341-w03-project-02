// src/controllers/auth.controller.js

const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const createHttpError = require('http-errors');
const { generateuserID } = require('../utils/idGenerator');

module.exports = {
    // ... other controllers
    
    githubSuccess: asyncHandler(async (req, res, next) => {
        res.status(200).json({
            message: 'GitHub login successful',
            user: {
                id: req.user._id,
                email: req.user.email,
                username: req.user.username,
                githubId: req.user.githubId,
                userID: req.user.userID,
                fullName: req.user.fullName,
                profilePicture: req.user.profilePicture,
                bio: req.user.bio,
                website: req.user.website,
                location: req.user.location,
                isVerified: req.user.isVerified,
            },
        });
    }),

    googleSuccess: asyncHandler(async (req, res, next) => {
        res.status(200).json({
            message: 'Google login successful',
            user: {
                id: req.user._id,
                email: req.user.email,
                username: req.user.username,
                googleId: req.user.googleId,
                userID: req.user.userID,
                fullName: req.user.fullName,
                profilePicture: req.user.profilePicture,
                isVerified: req.user.isVerified,
            },
        });
    }),

    loginSuccess: asyncHandler(async (req, res, next) => {
        res.status(200).json({
            message: 'Login successful',
            user: { id: req.user.id, email: req.user.email, username: req.user.username, userID: req.user.userID, fullName: req.user.fullName },
        });
    }),

    register: asyncHandler(async (req, res, next) => {
        const { email, password, username, fullName } = req.body;

        if (!email || !password || !username || !fullName) {
            throw createHttpError(400, 'Please provide all required fields.');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw createHttpError(409, 'Email already exists.');
        }

        // Generate public ID
        const userID = await generateuserID();

        const newUser = new User({
            email,
            password,
            username,
            fullName,
            userID,
        });

        await newUser.save();

        // log the user in immediately after registration
        req.login(newUser, (err) => {
            if (err) {
                return next(err);
            }
            res.status(201).json({
                message: 'Registration successful',
                user: { id: newUser.id, email: newUser.email, username: newUser.username, userID: newUser.userID, fullName: newUser.fullName },
            });
        });
    }),

    logout: (req, res) => {
        req.logout(() => {
            res.status(200).json({ message: 'Logged out successfully' });
        });
    },
};