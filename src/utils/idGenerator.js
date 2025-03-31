const User = require('../models/user.model.js');
const asyncHandler = require('express-async-handler');

module.exports = {
    generateuserID: asyncHandler(async () => {
        const prefix = 'SM-';
        const paddedLength = 5;

        // 1. Find the highest existing sequential number
        const lastUser = await User.findOne(
            { userID: { $regex: `^${prefix}` } },
            { userID: 1 },
            { sort: { userID: -1 } }
        );

        let nextNumber = 1;

        if (lastUser) {
            const lastNumber = parseInt(lastUser.userID.slice(prefix.length), 10);
            nextNumber = lastNumber + 1;
        }

        // 2. Pad the number with leading zeros
        const paddedNumber = nextNumber.toString().padStart(paddedLength, '0');

        // 3. Combine the prefix and padded number
        const userID = `${prefix}${paddedNumber}`;

        return userID;
    }),
};