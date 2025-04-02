const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("../config/config");
const User = require('../models/user.model'); 
const logger = require('../utils/logger'); 

module.exports = new GoogleStrategy(
    {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackUrl,
        scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Try to find the user by Google ID
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // If the user doesn't exist, create a new user
                const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

                // Check if the email exists
                const emailExists = email ? await User.exists({ email: email }) : false;

                if (emailExists) {
                    logger.warn(`Google login failed: Email ${email} already exists.`);
                    return done(null, false, { message: "Email already exists." });
                }

                user = new User({
                    googleId: profile.id,
                    username: profile.displayName.toLowerCase(),
                    email: email,
                    fullName: profile.displayName,
                    isVerified: true, 
                    
                });
            }

            // Update the user's accessToken and refreshToken
            user.googleAccessToken = accessToken;
            user.googleRefreshToken = refreshToken;

            await user.save();

            logger.info(`User ${user.username} logged in successfully using Google strategy.`);
            return done(null, user);
        } catch (error) {
            logger.error(`Error during Google authentication: ${error.message}`, error);
            return done(error);
        }
    }
);
