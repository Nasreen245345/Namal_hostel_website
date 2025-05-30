// test-booking.js - Run this in your backend directory
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import your models
const Booking = require('./models/Booking');
const User = require('./models/User');

async function testBookingCreation() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Check if models are properly defined
    console.log('\n📋 Testing model definitions...');
    console.log('Booking model fields:', Object.keys(Booking.schema.paths));
    
    // Test 2: Try to create a simple booking document
    console.log('\n🧪 Testing booking creation...');
    
    // First, let's find or create a test user
    let testUser = await User.findOne({ email: 'test@example.com' });
    if (!testUser) {
      console.log('Creating test user...');
      testUser = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword123',
        studentId: 'TEST001',
        role: 'student'
      });
    }
    console.log('✅ Test user:', testUser._id);

    // Test 3: Create a test booking
    const testBookingData = {
      userId: testUser._id,
      roomType: 'double',
      roomNumber: 'TEST-ROOM-001',
      hostelType: 'boys',
      checkInDate: new Date('2025-06-01'),
      checkOutDate: new Date('2025-06-30'),
      duration: 1,
      specialRequests: 'Test booking'
    };

    console.log('Creating booking with data:', testBookingData);
    
    const newBooking = await Booking.create(testBookingData);
    console.log('✅ Booking created successfully!');
    console.log('Booking ID:', newBooking._id);
    console.log('Full booking:', JSON.stringify(newBooking, null, 2));

    // Test 4: Verify it's in the database
    const foundBooking = await Booking.findById(newBooking._id);
    console.log('✅ Booking found in database:', foundBooking ? 'Yes' : 'No');

    // Test 5: Count total bookings
    const totalBookings = await Booking.countDocuments();
    console.log('✅ Total bookings in database:', totalBookings);

    // Clean up - delete test booking
   // After creating the booking, add this:
const allBookings = await Booking.find({});
console.log('All bookings in database:', allBookings);

// Don't clean up immediately - wait a bit
console.log('Keeping data for 30 seconds...');
setTimeout(async () => {
    // cleanup code here
}, 30000);

  } catch (error) {
    console.error('❌ Error during test:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      code: error.code
    });
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the test
testBookingCreation();