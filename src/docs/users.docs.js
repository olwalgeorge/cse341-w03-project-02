/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints for handling CRUD operations and profile management
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get current user profile
 *     description: Retrieves the complete profile of the currently authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User profile retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '507f1f77bcf86cd799439011'
 *                     userID:
 *                       type: string
 *                       example: 'SM-00001'
 *                     username:
 *                       type: string
 *                       example: 'john_doe'
 *                     email:
 *                       type: string
 *                       example: 'john.doe@example.com'
 *                     fullName:
 *                       type: string
 *                       example: 'John Doe'
 *                     role:
 *                       type: string
 *                       example: 'USER'
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *                     bio:
 *                       type: string
 *                       example: 'Software developer passionate about IoT'
 *                     location:
 *                       type: string
 *                       example: 'New York, USA'
 *                     website:
 *                       type: string
 *                       example: 'https://johndoe.com'
 *                     createdAt:
 *                       type: string
 *                       example: '2024-01-20T12:00:00Z'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve user profile
 */

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update current user profile
 *     description: Update the profile information of the currently authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'john_doe_2024'
 *                 description: 'New username (3-20 characters, alphanumeric and underscore)'
 *               email:
 *                 type: string
 *                 example: 'john.doe@example.com'
 *                 description: 'New email address'
 *               fullName:
 *                 type: string
 *                 example: 'John Robert Doe'
 *                 description: 'Updated full name (3-50 characters)'
 *               bio:
 *                 type: string
 *                 example: 'Software developer with 5 years of experience in IoT'
 *                 description: 'User biography'
 *               website:
 *                 type: string
 *                 example: 'https://johndoe.com'
 *                 description: 'Personal or professional website'
 *               location:
 *                 type: string
 *                 example: 'New York, USA'
 *                 description: 'User location'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User profile updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '507f1f77bcf86cd799439011'
 *                     userID:
 *                       type: string
 *                       example: 'SM-00001'
 *                     username:
 *                       type: string
 *                       example: 'john_doe_2024'
 *                     email:
 *                       type: string
 *                       example: 'john.doe@example.com'
 *                     fullName:
 *                       type: string
 *                       example: 'John Robert Doe'
 *                     bio:
 *                       type: string
 *                       example: 'Software developer with 5 years of experience in IoT'
 *                     website:
 *                       type: string
 *                       example: 'https://johndoe.com'
 *                     location:
 *                       type: string
 *                       example: 'New York, USA'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to update user profile
 */

/**
 * @swagger
 * /users/{userID}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a specific user by their SM-XXXXX format ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         description: User ID in SM-XXXXX format
 *         required: true
 *         schema:
 *           type: string
 *         example: 'SM-00001'
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '507f1f77bcf86cd799439011'
 *                     userID:
 *                       type: string
 *                       example: 'SM-00001'
 *                     username:
 *                       type: string
 *                       example: 'john_doe'
 *                     email:
 *                       type: string
 *                       example: 'john.doe@example.com'
 *                     fullName:
 *                       type: string
 *                       example: 'John Doe'
 *                     role:
 *                       type: string
 *                       example: 'USER'
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve user
 */

/**
 * @swagger
 * /users/{_id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Permanently removes a user from the system by their MongoDB _id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         description: MongoDB _id of the user
 *         required: true
 *         schema:
 *           type: string
 *         example: '507f1f77bcf86cd799439011'
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid user ID format
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to delete user
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users in the system. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: '507f1f77bcf86cd799439011'
 *                       userID:
 *                         type: string
 *                         example: 'SM-00001'
 *                       username:
 *                         type: string
 *                         example: 'john_doe'
 *                       email:
 *                         type: string
 *                         example: 'john@example.com'
 *                         description: Valid email address
 *                       fullName:
 *                         type: string
 *                         example: 'John Doe'
 *                       role:
 *                         type: string
 *                         example: 'USER'
 *                       isVerified:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve users
 */

/**
 * @swagger
 * /users/username/{username}:
 *   get:
 *     summary: Get user by username
 *     description: Retrieves a user by their unique username
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Username to search for
 *         required: true
 *         schema:
 *           type: string
 *         example: 'john_doe'
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '507f1f77bcf86cd799439011'
 *                     userID:
 *                       type: string
 *                       example: 'SM-00001'
 *                     username:
 *                       type: string
 *                       example: 'john_doe'
 *                     email:
 *                       type: string
 *                       example: 'john@example.com'
 *                       description: Valid email address
 *                     fullName:
 *                       type: string
 *                       example: 'John Doe'
 *                     role:
 *                       type: string
 *                       example: 'USER'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve user
 */

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get user by email
 *     description: Retrieves a user by their email address
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         description: Email address to search for
 *         required: true
 *         schema:
 *           type: string
 *         example: 'john@example.com'
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '507f1f77bcf86cd799439011'
 *                     userID:
 *                       type: string
 *                       example: 'SM-00001'
 *                     username:
 *                       type: string
 *                       example: 'john_doe'
 *                     email:
 *                       type: string
 *                       example: 'john@example.com'
 *                     fullName:
 *                       type: string
 *                       example: 'John Doe'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve user
 */

/**
 * @swagger
 * /users/role/{role}:
 *   get:
 *     summary: Get users by role
 *     description: Retrieves all users with a specific role (SUPERADMIN, ADMIN, USER, or ORG)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role
 *         description: Role to filter users by
 *         required: true
 *         schema:
 *           type: string
 *           enum: ['SUPERADMIN', 'ADMIN', 'USER', 'ORG']
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: '507f1f77bcf86cd799439011'
 *                       userID:
 *                         type: string
 *                         example: 'SM-00001'
 *                       username:
 *                         type: string
 *                         example: 'john_doe'
 *                       email:
 *                         type: string
 *                         example: 'john@example.com'
 *                       fullName:
 *                         type: string
 *                         example: 'John Doe'
 *                       role:
 *                         type: string
 *                         example: 'USER'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       404:
 *         description: Users not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Users not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve users
 */

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete all users
 *     description: Permanently removes all users from the system. Use with caution!
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: All users deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     deletedCount:
 *                       type: integer
 *                       example: 10
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to delete all users
 */

/**
 * @swagger
 * /users/{_id}:
 *   put:
 *     summary: Update user by ID
 *     description: Updates a user's information by their MongoDB _id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         description: MongoDB _id of the user
 *         required: true
 *         schema:
 *           type: string
 *         example: '507f1f77bcf86cd799439011'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'john_doe_updated'
 *               email:
 *                 type: string
 *                 example: 'john.updated@example.com'
 *               fullName:
 *                 type: string
 *                 example: 'John Updated Doe'
 *               role:
 *                 type: string
 *                 enum: ['SUPERADMIN', 'ADMIN', 'USER', 'ORG']
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: '507f1f77bcf86cd799439011'
 *                     userID:
 *                       type: string
 *                       example: 'SM-00001'
 *                     username:
 *                       type: string
 *                       example: 'john_doe_updated'
 *                     email:
 *                       type: string
 *                       example: 'john.updated@example.com'
 *                     fullName:
 *                       type: string
 *                       example: 'John Updated Doe'
 *                     role:
 *                       type: string
 *                       example: 'USER'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authenticated
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to update user
 */
