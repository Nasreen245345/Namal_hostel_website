import React, { useState, useEffect } from 'react';
import counselingService from '../../services/counselingService';
// import { useAuth } from '../contexts/AuthContext'; // Uncomment when available

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    counselorId: '',
    date: '',
    timeSlot: '',
    reasonForVisit: '',
    preferredMode: 'in-person',
    urgency: 'normal',
    previousVisit: 'no'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [counselors, setCounselors] = useState([]);
  const [loadingCounselors, setLoadingCounselors] = useState(true);

  // TODO: Uncomment when useAuth hook is available
  // const { token, user } = useAuth();
  
  // Mock token for development - replace with actual auth
  const token = "your-jwt-token-here";

  // Styling
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
    },
    header: {
      marginBottom: '30px',
      textAlign: 'center',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    formRow: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
    },
    formGroup: {
      flex: '1 1 300px',
      display: 'flex',
      flexDirection: 'column',
    },
    fullWidth: {
      flex: '1 1 100%',
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '6px',
      color: '#333',
    },
    input: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
      outline: 'none',
    },
    inputFocus: {
      borderColor: '#1e88e5',
    },
    select: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      backgroundColor: 'white',
      transition: 'border-color 0.3s ease',
      outline: 'none',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px top 50%',
      backgroundSize: '12px auto',
    },
    textarea: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
      outline: 'none',
      minHeight: '120px',
      resize: 'vertical',
    },
    radioGroup: {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap',
    },
    radioOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer',
    },
    radio: {
      cursor: 'pointer',
    },
    radioLabel: {
      fontSize: '14px',
      cursor: 'pointer',
    },
    error: {
      color: '#d32f2f',
      fontSize: '12px',
      marginTop: '4px',
    },
    submitButton: {
      backgroundColor: '#1e88e5',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '14px 20px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginTop: '10px',
      textAlign: 'center',
    },
    buttonHover: {
      backgroundColor: '#1565c0',
    },
    buttonDisabled: {
      backgroundColor: '#90caf9',
      cursor: 'not-allowed',
    },
    successMessage: {
      backgroundColor: '#c8e6c9',
      color: '#2e7d32',
      padding: '15px',
      borderRadius: '4px',
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '16px',
    },
    errorMessage: {
      backgroundColor: '#ffcdd2',
      color: '#c62828',
      padding: '15px',
      borderRadius: '4px',
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '16px',
    },
    note: {
      backgroundColor: '#e3f2fd',
      color: '#1565c0',
      padding: '10px 15px',
      borderRadius: '4px',
      fontSize: '14px',
      marginTop: '20px',
    },
    noteTitle: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    loadingMessage: {
      textAlign: 'center',
      color: '#666',
      fontSize: '14px',
      fontStyle: 'italic',
    }
  };

  // Default time slots - will be used if API doesn't provide them
  const defaultTimeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ];

  // Form input focus state
  const [focusedInput, setFocusedInput] = useState(null);

  // Button hover state
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Load counselors on component mount
  useEffect(() => {
    loadCounselors();
  }, []);

  const loadCounselors = async () => {
    try {
      setLoadingCounselors(true);
      const response = await counselingService.getAllCounselors();
      
      if (response.success && response.data) {
        setCounselors(response.data);
      } else {
        // Fallback to mock data if API fails
        setCounselors([
          { _id: '1', name: 'Dr. Aisha Khan', specialization: 'Clinical Psychology' },
          { _id: '2', name: 'Mr. Tariq Ahmed', specialization: 'Career Counseling' },
          { _id: '3', name: 'Ms. Sara Malik', specialization: 'Student Life Advisory' }
        ]);
      }
    } catch (error) {
      console.error('Error loading counselors:', error);
      // Use fallback data
      setCounselors([
        { _id: '1', name: 'Dr. Aisha Khan', specialization: 'Clinical Psychology' },
        { _id: '2', name: 'Mr. Tariq Ahmed', specialization: 'Career Counseling' },
        { _id: '3', name: 'Ms. Sara Malik', specialization: 'Student Life Advisory' }
      ]);
    } finally {
      setLoadingCounselors(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.counselorId) {
      newErrors.counselorId = 'Please select a counselor';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      // Check if date is not in the past
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }
    
    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a time slot';
    }
    
    if (!formData.reasonForVisit.trim()) {
      newErrors.reasonForVisit = 'Please provide a reason for your visit';
    } else if (formData.reasonForVisit.trim().length < 10) {
      newErrors.reasonForVisit = 'Please provide a more detailed reason (at least 10 characters)';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear any previous errors
    setErrors({});
    setSubmitError('');
    setIsSubmitting(true);
    
    try {
      // Check if user is authenticated
      if (!token) {
        throw new Error('You must be logged in to book an appointment');
      }

      // Submit the appointment
      const response = await counselingService.bookAppointment(formData);
      
      if (response.success) {
        setSubmitSuccess(true);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          studentId: '',
          email: '',
          phone: '',
          counselorId: '',
          date: '',
          timeSlot: '',
          reasonForVisit: '',
          preferredMode: 'in-person',
          urgency: 'normal',
          previousVisit: 'no'
        });
        
        // Hide success message after 8 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 8000);
      } else {
        throw new Error(response.message || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setSubmitError(error.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Counseling Appointment</h2>
        <p style={styles.subtitle}>
          Fill out the form below to schedule an appointment with one of our counselors.
        </p>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{
                ...styles.input,
                ...(focusedInput === 'name' ? styles.inputFocus : {}),
                ...(errors.name ? { borderColor: '#d32f2f' } : {}),
                ...(isSubmitting ? { opacity: 0.7 } : {})
              }}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.name && <div style={styles.error}>{errors.name}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{
                ...styles.input,
                ...(focusedInput === 'studentId' ? styles.inputFocus : {}),
                ...(errors.studentId ? { borderColor: '#d32f2f' } : {}),
                ...(isSubmitting ? { opacity: 0.7 } : {})
              }}
              onFocus={() => setFocusedInput('studentId')}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.studentId && <div style={styles.error}>{errors.studentId}</div>}
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{
                ...styles.input,
                ...(focusedInput === 'email' ? styles.inputFocus : {}),
                ...(errors.email ? { borderColor: '#d32f2f' } : {}),
                ...(isSubmitting ? { opacity: 0.7 } : {})
              }}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.email && <div style={styles.error}>{errors.email}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{
                ...styles.input,
                ...(focusedInput === 'phone' ? styles.inputFocus : {}),
                ...(errors.phone ? { borderColor: '#d32f2f' } : {}),
                ...(isSubmitting ? { opacity: 0.7 } : {})
              }}
              onFocus={() => setFocusedInput('phone')}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.phone && <div style={styles.error}>{errors.phone}</div>}
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="counselorId">Counselor</label>
            <select
              id="counselorId"
              name="counselorId"
              value={formData.counselorId}
              onChange={handleChange}
              disabled={isSubmitting || loadingCounselors}
              style={{
                ...styles.select,
                ...(focusedInput === 'counselorId' ? styles.inputFocus : {}),
                ...(errors.counselorId ? { borderColor: '#d32f2f' } : {}),
                ...(isSubmitting || loadingCounselors ? { opacity: 0.7 } : {})
              }}
              onFocus={() => setFocusedInput('counselorId')}
              onBlur={() => setFocusedInput(null)}
            >
              <option value="">
                {loadingCounselors ? 'Loading counselors...' : 'Select a counselor'}
              </option>
              {counselors.map(counselor => (
                <option key={counselor._id || counselor.id} value={counselor._id || counselor.id}>
                  {counselor.name} {counselor.specialization ? `- ${counselor.specialization}` : ''}
                </option>
              ))}
            </select>
            {errors.counselorId && <div style={styles.error}>{errors.counselorId}</div>}
            {loadingCounselors && (
              <div style={styles.loadingMessage}>Loading available counselors...</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="urgency">Urgency Level</label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{
                ...styles.select,
                ...(focusedInput === 'urgency' ? styles.inputFocus : {}),
                ...(isSubmitting ? { opacity: 0.7 } : {})
              }}
              onFocus={() => setFocusedInput('urgency')}
              onBlur={() => setFocusedInput(null)}
            >
              <option value="low">Low - Just want to talk</option>
              <option value="normal">Normal - Need guidance</option>
              <option value="high">High - Urgent matter</option>
            </select>
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="date">Preferred Date</label>
            <input
              type="date"
              id="date"
              name="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{
                ...styles.input,
                ...(focusedInput === 'date' ? styles.inputFocus : {}),
                ...(errors.date ? { borderColor: '#d32f2f' } : {}),
                ...(isSubmitting ? { opacity: 0.7 } : {})
              }}
              onFocus={() => setFocusedInput('date')}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.date && <div style={styles.error}>{errors.date}</div>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="timeSlot">Preferred Time</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              disabled={isSubmitting}
              style={{
                ...styles.select,
                ...(focusedInput === 'timeSlot' ? styles.inputFocus : {}),
                ...(errors.timeSlot ? { borderColor: '#d32f2f' } : {}),
                ...(isSubmitting ? { opacity: 0.7 } : {})
              }}
              onFocus={() => setFocusedInput('timeSlot')}
              onBlur={() => setFocusedInput(null)}
            >
              <option value="">Select a time slot</option>
              {defaultTimeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.timeSlot && <div style={styles.error}>{errors.timeSlot}</div>}
          </div>
        </div>

        <div style={{...styles.formGroup, ...styles.fullWidth}}>
          <label style={styles.label}>Preferred Mode</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="inPerson"
                name="preferredMode"
                value="in-person"
                checked={formData.preferredMode === 'in-person'}
                onChange={handleChange}
                disabled={isSubmitting}
                style={styles.radio}
              />
              <label htmlFor="inPerson" style={styles.radioLabel}>In-person</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="virtual"
                name="preferredMode"
                value="virtual"
                checked={formData.preferredMode === 'virtual'}
                onChange={handleChange}
                disabled={isSubmitting}
                style={styles.radio}
              />
              <label htmlFor="virtual" style={styles.radioLabel}>Virtual (Zoom)</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="phone"
                name="preferredMode"
                value="phone"
                checked={formData.preferredMode === 'phone'}
                onChange={handleChange}
                disabled={isSubmitting}
                style={styles.radio}
              />
              <label htmlFor="phone" style={styles.radioLabel}>Phone Call</label>
            </div>
          </div>
        </div>

        <div style={{...styles.formGroup, ...styles.fullWidth}}>
          <label style={styles.label}>Is This Your First Visit?</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="firstYes"
                name="previousVisit"
                value="no"
                checked={formData.previousVisit === 'no'}
                onChange={handleChange}
                disabled={isSubmitting}
                style={styles.radio}
              />
              <label htmlFor="firstYes" style={styles.radioLabel}>Yes, this is my first visit</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="firstNo"
                name="previousVisit"
                value="yes"
                checked={formData.previousVisit === 'yes'}
                onChange={handleChange}
                disabled={isSubmitting}
                style={styles.radio}
              />
              <label htmlFor="firstNo" style={styles.radioLabel}>No, I've visited before</label>
            </div>
          </div>
        </div>

        <div style={{...styles.formGroup, ...styles.fullWidth}}>
          <label style={styles.label} htmlFor="reasonForVisit">Reason for Visit</label>
          <textarea
            id="reasonForVisit"
            name="reasonForVisit"
            value={formData.reasonForVisit}
            onChange={handleChange}
            placeholder="Please briefly describe the reason for your appointment..."
            disabled={isSubmitting}
            style={{
              ...styles.textarea,
              ...(focusedInput === 'reasonForVisit' ? styles.inputFocus : {}),
              ...(errors.reasonForVisit ? { borderColor: '#d32f2f' } : {}),
              ...(isSubmitting ? { opacity: 0.7 } : {})
            }}
            onFocus={() => setFocusedInput('reasonForVisit')}
            onBlur={() => setFocusedInput(null)}
          />
          {errors.reasonForVisit && <div style={styles.error}>{errors.reasonForVisit}</div>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.submitButton,
            ...(isButtonHovered && !isSubmitting ? styles.buttonHover : {}),
            ...(isSubmitting ? styles.buttonDisabled : {})
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
        </button>

        {submitSuccess && (
          <div style={styles.successMessage}>
            Your appointment has been scheduled successfully! You will receive a confirmation email shortly.
          </div>
        )}

        {submitError && (
          <div style={styles.errorMessage}>
            {submitError}
          </div>
        )}

        <div style={styles.note}>
          <div style={styles.noteTitle}>Note:</div>
          <p>
            All information shared during counseling sessions is strictly confidential. 
            Please arrive 5 minutes before your scheduled appointment time.
            If you need to cancel or reschedule, please do so at least 24 hours in advance.
          </p>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;