# Smart Farm API

A RESTful API for managing smart farm sensors and users with authentication support.

## Features

- User authentication (Local, GitHub, Google)
- User management (CRUD operations)
- Sensor management (CRUD operations)
- Role-based access control
- API documentation with Swagger
- MongoDB integration
- Error handling and logging

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for authentication
- Winston for logging
- Express Validator for input validation
- Swagger UI for API documentation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- GitHub OAuth App (for GitHub authentication)
- Google OAuth credentials (for Google authentication)

## Environment Variables

Create `.env.development` and `.env.production` files with:

```env
NODE_ENV=development|production
PORT=3000
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Production only
RENDER_EXTERNAL_HOSTNAME=your_production_url
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd smart-farm-api
```

2. Install dependencies:

```bash
npm install
```

3. Generate Swagger documentation:

```bash
npm run swagger-gen
```

4. Start the server:

```bash
# Development
npm run dev

# Production
npm start
```

## API Documentation

Access the Swagger UI documentation at:

- Development: `http://localhost:3000/api-docs`
- Production: `https://your-domain.com/api-docs`

## API Endpoints

### Authentication

- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user
- POST `/auth/logout` - Logout user
- GET `/auth/github` - GitHub OAuth login
- GET `/auth/google` - Google OAuth login

### Users

- GET `/users/profile` - Get current user profile
- PUT `/users/profile` - Update user profile
- GET `/users/:userID` - Get user by ID
- PUT `/users/:_id` - Update user
- DELETE `/users/:_id` - Delete user
- GET `/users` - Get all users
- DELETE `/users` - Delete all users (SUPERADMIN only)

### Sensors

- GET `/sensors` - Get all sensors
- POST `/sensors` - Create new sensor
- GET `/sensors/:sensor_id` - Get sensor by ID
- PUT `/sensors/:_id` - Update sensor
- DELETE `/sensors/:_id` - Delete sensor
- GET `/sensors/type/:sensor_type` - Get sensors by type

## Testing

The project includes test files for:

- Controllers
- Services
- Models
- Middleware
- Routes

Run tests with:

```bash
npm test
```

## Project Structure

```
src/
├── auth/           # Authentication strategies
├── config/         # Configuration files
├── controllers/    # Request handlers
├── docs/          # API documentation
├── middlewares/   # Express middlewares
├── models/        # Mongoose models
├── routes/        # Express routes
├── services/      # Business logic
├── utils/         # Utility functions
├── app.js         # Express app setup
└── server.js      # Server entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
