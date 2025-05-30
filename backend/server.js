const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const lostFoundRoutes = require("./routes/lostFoundRoutes");
const counselingRoutes = require("./routes/counselingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware: CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware: Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware: Logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// Database Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/namal_hostel';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

// Connect to Database
connectDB();

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Namal Hostel Management Server is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        services: {
            auth: 'Active',
            bookings: 'Active',
            complaints: 'Active',
            lostFound: 'Active',
            counseling: 'Active'
        }
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/lostfound", lostFoundRoutes);
app.use("/api/counseling", counselingRoutes);
app.use('/dashboard', dashboardRoutes);

// Test Routes (for development - remove in production)
app.get('/api/test/complaints', (req, res) => {
    res.json({
        success: true,
        message: 'Complaints route is accessible',
        availableRoutes: [
            'GET /api/complaints - Get all complaints',
            'POST /api/complaints - Submit new complaint',
            'GET /api/complaints/:id - Get specific complaint',
            'PUT /api/complaints/:id - Update complaint',
            'DELETE /api/complaints/:id - Delete complaint',
            'GET /api/complaints/stats - Get complaint statistics'
        ]
    });
});

app.get('/api/test/lostfound', (req, res) => {
    res.json({
        success: true,
        message: 'Lost & Found route is accessible',
        availableRoutes: [
            'GET /api/lostfound - Get all lost/found items',
            'POST /api/lostfound - Report new lost/found item',
            'GET /api/lostfound/my-items - Get user\'s items',
            'GET /api/lostfound/:id - Get specific item',
            'PUT /api/lostfound/:id - Update item',
            'DELETE /api/lostfound/:id - Delete item',
            'GET /api/lostfound/stats - Get lost/found statistics'
        ]
    });
});

// Enhanced: Counseling test route with detailed info
app.get('/api/test/counseling', (req, res) => {
    res.json({
        success: true,
        message: 'Counseling service is fully operational',
        version: '1.0.0',
        features: {
            appointments: 'Active',
            counselorManagement: 'Active',
            statusTracking: 'Active',
            notifications: 'Planned'
        },
        availableRoutes: [
            'GET /api/counseling/counselors - Get all counselors with availability',
            'GET /api/counseling/counselors/:counselorId - Get specific counselor details',
            'POST /api/counseling/appointments - Book new appointment (requires auth)',
            'GET /api/counseling/appointments/my - Get user\'s appointments (requires auth)',
            'GET /api/counseling/appointments/user - Get user appointments (legacy)',
            'GET /api/counseling/appointments/counselor - Get counselor\'s appointments (counselor auth)',
            'PATCH /api/counseling/appointments/:appointmentId/status - Update appointment status',
            'PATCH /api/counseling/appointments/:appointmentId/reschedule - Reschedule appointment',
            'DELETE /api/counseling/appointments/:appointmentId - Cancel appointment',
            'GET /api/counseling/stats - Get counseling service statistics'
        ],
        supportedStatuses: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
        appointmentTypes: ['academic', 'personal', 'career', 'mental_health', 'general']
    });
});

// Test route for authentication
app.get('/api/test/auth', (req, res) => {
    res.json({
        success: true,
        message: 'Authentication service is running',
        availableRoutes: [
            'POST /api/auth/register - Register new user',
            'POST /api/auth/login - User login',
            'POST /api/auth/logout - User logout',
            'GET /api/auth/profile - Get user profile (requires auth)',
            'PUT /api/auth/profile - Update user profile (requires auth)',
            'POST /api/auth/forgot-password - Request password reset',
            'POST /api/auth/reset-password - Reset password with token',
            'POST /api/auth/verify-email - Verify email address'
        ]
    });
});

// Test route for bookings
app.get('/api/test/bookings', (req, res) => {
    res.json({
        success: true,
        message: 'Booking service is operational',
        availableRoutes: [
            'GET /api/bookings - Get all bookings',
            'POST /api/bookings - Create new booking',
            'GET /api/bookings/my - Get user\'s bookings (requires auth)',
            'GET /api/bookings/:id - Get specific booking',
            'PUT /api/bookings/:id - Update booking',
            'DELETE /api/bookings/:id - Cancel booking',
            'GET /api/bookings/rooms/availability - Check room availability',
            'GET /api/bookings/stats - Get booking statistics'
        ],
        bookingTypes: ['room', 'facility', 'common_area', 'study_hall']
    });
});

// Catch-all route for undefined endpoints
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`,
        availableEndpoints: {
            health: 'GET /health',
            auth: 'GET /api/test/auth',
            bookings: 'GET /api/test/bookings',
            complaints: 'GET /api/test/complaints',
            lostFound: 'GET /api/test/lostfound',
            counseling: 'GET /api/test/counseling'
        }
    });
});

// Global Error Handler
app.use((error, req, res, next) => {
    console.error('❌ Global Error Handler:', error);
    
    // Mongoose validation error
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors
        });
    }
    
    // Mongoose duplicate key error
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(400).json({
            success: false,
            message: `${field} already exists`,
            field
        });
    }
    
    // JWT errors
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
    
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired'
        });
    }
    
    // Default error
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Namal Hostel Management Server running on port ${PORT}`);
    console.log(`📍 Server URL: http://localhost:${PORT}`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error('❌ Unhandled Promise Rejection:', err.message);
    server.close(() => {
        process.exit(1);
    });
});

module.exports = app;