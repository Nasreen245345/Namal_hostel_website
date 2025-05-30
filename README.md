# Namal Hostel Management System

Backend API for managing hostel facilities, room bookings, complaints, and more for Namal Residency.

## Tech Stack

- Node.js
- Express
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local installation or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd namal-hostel-system/backend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit the `.env` file with your own values, especially:
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT token generation

4. Create uploads directory
```bash
mkdir -p uploads
touch uploads/.gitkeep
```

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

The server will start on the port defined in your `.env` file (default: 5000).

### API Testing

You can test the API using tools like Postman or your browser:

1. Health check endpoint:
```
GET http://localhost:5000/api/healthcheck
```
Expected response:
```json
{
  "status": "ok",
  "message": "Namal Hostel API is running"
}
```

2. Register a user:
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "studentId": "NAMAL2023001",
  "hostelType": "boys",
  "phoneNumber": "03001234567"
}
```

3. Login:
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

## Project Structure

```
backend/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/           # Mongoose models
├── routes/           # API routes
├── utils/            # Utility functions
├── uploads/          # Uploaded files
├── .env              # Environment variables
├── .gitignore        # Git ignore file
├── package.json      # Project dependencies
├── README.md         # Project documentation
└── server.js         # Entry point
```

## Features

- User authentication (JWT)
- Room booking system
- Complaint management
- Menu updates
- Lost & Found system
- Student counseling
- Image gallery
- Fee structure information
- Student dashboard

## API Documentation

Full API documentation will be provided in a later phase.

## License

This project is licensed under the ISC License.