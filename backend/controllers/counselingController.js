// controllers/counselingController.js
const Counselor = require('../models/Counselor');
const User = require('../models/User'); // Assuming you have a User model

// Get all active counselors (public route)
const getAllCounselors = async (req, res) => {
  try {
    const counselors = await Counselor.find({ isActive: true })
      .select('-appointments -createdAt -updatedAt -__v')
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: counselors.length,
      data: counselors
    });
  } catch (error) {
    console.error('Error fetching counselors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch counselors',
      error: error.message
    });
  }
};

// Get counselor details with available slots (public route)
const getCounselorDetails = async (req, res) => {
  try {
    const { counselorId } = req.params;
    
    const counselor = await Counselor.findById(counselorId)
      .select('-appointments -createdAt -updatedAt -__v');

    if (!counselor) {
      return res.status(404).json({
        success: false,
        message: 'Counselor not found'
      });
    }

    if (!counselor.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Counselor is not currently available'
      });
    }

    res.status(200).json({
      success: true,
      data: counselor
    });
  } catch (error) {
    console.error('Error fetching counselor details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch counselor details',
      error: error.message
    });
  }
};

// Book an appointment (protected route)
const bookAppointment = async (req, res) => {
  try {
    const {
      name,
      studentId: studentIdNumber,
      email,
      phone,
      counselorId,
      date,
      timeSlot,
      reasonForVisit,
      preferredMode = 'in-person',
      urgency = 'normal',
      previousVisit = 'no'
    } = req.body;

    // Validation
    if (!name || !studentIdNumber || !email || !phone || !counselorId || 
        !date || !timeSlot || !reasonForVisit) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if date is not in the past
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book appointments for past dates'
      });
    }

    // Find the counselor
    const counselor = await Counselor.findById(counselorId);
    if (!counselor || !counselor.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Counselor not found or not available'
      });
    }

    // Check if the time slot is in counselor's available slots
    if (!counselor.availableSlots.includes(timeSlot)) {
      return res.status(400).json({
        success: false,
        message: 'Selected time slot is not available for this counselor'
      });
    }

    // Check if slot is available for the date
    if (!counselor.isSlotAvailable(appointmentDate, timeSlot)) {
      return res.status(409).json({
        success: false,
        message: 'Selected time slot is already booked for this date'
      });
    }

    // Check if student already has an appointment on the same date and time
    const existingStudentAppointment = counselor.appointments.find(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === appointmentDate.toDateString() && 
             apt.timeSlot === timeSlot && 
             apt.studentIdNumber === studentIdNumber &&
             apt.status !== 'cancelled' && 
             apt.status !== 'rejected';
    });

    if (existingStudentAppointment) {
      return res.status(409).json({
        success: false,
        message: 'You already have an appointment booked for this time slot'
      });
    }

    // Create the appointment
    const newAppointment = {
      studentId: req.user._id, // From auth middleware
      studentName: name,
      studentEmail: email,
      studentPhone: phone,
      studentIdNumber: studentIdNumber,
      date: appointmentDate,
      timeSlot,
      reasonForVisit,
      preferredMode,
      urgency,
      previousVisit,
      status: 'pending'
    };

    // Add appointment to counselor
    counselor.appointments.push(newAppointment);
    await counselor.save();

    // Get the created appointment (last one added)
    const createdAppointment = counselor.appointments[counselor.appointments.length - 1];

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        appointmentId: createdAppointment._id,
        counselorName: counselor.name,
        date: createdAppointment.date,
        timeSlot: createdAppointment.timeSlot,
        status: createdAppointment.status,
        preferredMode: createdAppointment.preferredMode
      }
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book appointment',
      error: error.message
    });
  }
};

// Get user's appointments (protected route)
const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all counselors and get appointments for this user
    const counselors = await Counselor.find({
      'appointments.studentId': userId
    }).select('name designation appointments');

    let userAppointments = [];

    counselors.forEach(counselor => {
      const userAppts = counselor.appointments
        .filter(apt => apt.studentId.toString() === userId.toString())
        .map(apt => ({
          _id: apt._id,
          counselorName: counselor.name,
          counselorDesignation: counselor.designation,
          date: apt.date,
          timeSlot: apt.timeSlot,
          status: apt.status,
          preferredMode: apt.preferredMode,
          urgency: apt.urgency,
          reasonForVisit: apt.reasonForVisit,
          notes: apt.notes,
          createdAt: apt.createdAt
        }));
      
      userAppointments = userAppointments.concat(userAppts);
    });

    // Sort by date (newest first)
    userAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      success: true,
      count: userAppointments.length,
      data: userAppointments
    });
  } catch (error) {
    console.error('Error fetching user appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: error.message
    });
  }
};

// Cancel appointment (protected route)
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user._id;

    // Find the counselor with this appointment
    const counselor = await Counselor.findOne({
      'appointments._id': appointmentId
    });

    if (!counselor) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    const appointment = counselor.appointments.id(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if the appointment belongs to the user
    if (appointment.studentId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only cancel your own appointments'
      });
    }

    // Check if appointment can be cancelled
    if (appointment.status === 'completed' || appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel ${appointment.status} appointment`
      });
    }

    // Update appointment status
    appointment.status = 'cancelled';
    appointment.updatedAt = new Date();
    
    await counselor.save();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: {
        appointmentId: appointment._id,
        status: appointment.status
      }
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel appointment',
      error: error.message
    });
  }
};

// Update appointment status (admin/counselor only)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status, notes } = req.body;

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status provided'
      });
    }

    // Find the counselor with this appointment
    const counselor = await Counselor.findOne({
      'appointments._id': appointmentId
    });

    if (!counselor) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    const appointment = counselor.appointments.id(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Update appointment
    appointment.status = status;
    appointment.updatedAt = new Date();
    
    if (notes) {
      appointment.notes = notes;
    }

    await counselor.save();

    res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      data: {
        appointmentId: appointment._id,
        status: appointment.status,
        notes: appointment.notes
      }
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment status',
      error: error.message
    });
  }
};

// Get counselor's appointments (for counselor dashboard)
const getCounselorAppointments = async (req, res) => {
  try {
    const { counselorId } = req.params;
    const { status, date } = req.query;

    let query = { _id: counselorId };
    
    const counselor = await Counselor.findOne(query);
    
    if (!counselor) {
      return res.status(404).json({
        success: false,
        message: 'Counselor not found'
      });
    }

    let appointments = counselor.appointments;

    // Filter by status if provided
    if (status) {
      appointments = appointments.filter(apt => apt.status === status);
    }

    // Filter by date if provided
    if (date) {
      const filterDate = new Date(date);
      appointments = appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate.toDateString() === filterDate.toDateString();
      });
    }

    // Sort by date (newest first)
    appointments.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      success: true,
      counselorName: counselor.name,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching counselor appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch counselor appointments',
      error: error.message
    });
  }
};

module.exports = {
  getAllCounselors,
  getCounselorDetails,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  updateAppointmentStatus,
  getCounselorAppointments
};