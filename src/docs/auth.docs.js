/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints for user registration, login, and OAuth providers
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     description: Creates a new user account with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *               - fullName
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'john.doe@example.com'
 *                 description: 'Valid email address'
 *               password:
 *                 type: string
 *                 example: 'StrongP@ss123'
 *                 description: 'Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special)'
 *               username:
 *                 type: string
 *                 example: 'john_doe'
 *                 description: 'Username (3-20 chars, alphanumeric and underscore)'
 *               fullName:
 *                 type: string
 *                 example: 'John Doe'
 *                 description: 'Full name (3-50 characters)'
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *                   example: Registration successful
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
 *                 error:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ['Email is required', 'Password is too weak']
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'john.doe@example.com'
 *               password:
 *                 type: string
 *                 example: 'StrongP@ss123'
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         userID:
 *                           type: string
 *                           example: 'SM-00001'
 *                         username:
 *                           type: string
 *                           example: 'john_doe'
 *                         email:
 *                           type: string
 *                           example: 'john.doe@example.com'
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the currently authenticated user and invalidates their session
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
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
 *                   example: Logged out successfully
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
 */

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: GitHub OAuth login
 *     description: Initiates GitHub OAuth authentication flow by redirecting to GitHub login page
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to GitHub authorization page
 */

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     description: Handles the callback from GitHub OAuth authentication
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to dashboard on success, login page on failure
 *       400:
 *         description: OAuth error
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
 *                   example: GitHub authentication failed
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Google OAuth login
 *     description: Initiates Google OAuth authentication flow by redirecting to Google login page
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Google authorization page
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handles the callback from Google OAuth authentication
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to dashboard on success, login page on failure
 *       400:
 *         description: OAuth error
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
 *                   example: Google authentication failed
 */
