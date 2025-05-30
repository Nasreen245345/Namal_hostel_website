import React, { useState, useEffect } from 'react';
import bookingService from '../../services/bookingService.js';

const BookingForm = ({ selectedRoom, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    gender: '',
    department: '',
    semester: '',
    startDate: '',
    endDate: '',              
    hostelType: '',           
    duration: '1',
    emergencyContactName: '',
    emergencyContactPhone: '',
    address: '',
    roomPreference: selectedRoom || '',
    specialRequirements: '',
    agreesToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const styles = {
    formContainer: {
      maxWidth: '800px',
      margin: '30px auto',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      padding: '30px',
    },
    title: {
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '25px',
      fontSize: '1.8rem',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px',
    },
    formSection: {
      marginBottom: '25px',
    },
    sectionTitle: {
      fontSize: '1.2rem',
      color: '#2c3e50',
      marginBottom: '15px',
      paddingBottom: '8px',
      borderBottom: '1px solid #eee',
    },
    formRow: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '15px',
      gap: '20px',
    },
    formGroup: {
      flex: '1 1 calc(50% - 10px)',
      minWidth: '250px',
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '0.95rem',
      fontWeight: '500',
      color: '#34495e',
    },
    input: {
      width: '100%',
      padding: '10px 15px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#3498db',
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)',
    },
    select: {
      width: '100%',
      padding: '10px 15px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      backgroundColor: '#fff',
      cursor: 'pointer',
    },
    selectDisabled: {
      backgroundColor: '#f8f9fa',
      cursor: 'not-allowed',
      opacity: 0.6,
    },
    textarea: {
      width: '100%',
      padding: '10px 15px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      minHeight: '100px',
      resize: 'vertical',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '20px',
    },
    checkbox: {
      marginRight: '10px',
      cursor: 'pointer',
    },
    termsText: {
      fontSize: '0.9rem',
      color: '#555',
    },
    submitBtn: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '5px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      display: 'block',
      margin: '30px auto 0',
      width: '200px',
      opacity: isSubmitting ? 0.7 : 1,
    },
    submitBtnDisabled: {
      backgroundColor: '#95a5a6',
      cursor: 'not-allowed',
    },
    submitBtnHover: {
      backgroundColor: '#2980b9',
    },
    error: {
      color: '#e74c3c',
      fontSize: '0.85rem',
      marginTop: '5px',
    },
    successMessage: {
      backgroundColor: '#27ae60',
      color: 'white',
      padding: '15px',
      borderRadius: '5px',
      textAlign: 'center',
      marginBottom: '20px',
    },
    errorMessage: {
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '15px',
      borderRadius: '5px',
      textAlign: 'center',
      marginBottom: '20px',
    },
    fullWidth: {
      flex: '1 1 100%',
    },
    infoText: {
      fontSize: '0.85rem',
      color: '#7f8c8d',
      marginTop: '5px',
      fontStyle: 'italic',
    }
  };

  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // Helper function to get available hostel options based on gender
  const getAvailableHostelOptions = (gender) => {
    if (gender === 'male') {
      return [{ value: 'boys', label: 'Boys Hostel' }];
    } else if (gender === 'female') {
      return [{ value: 'girls', label: 'Girls Hostel' }];
    } else {
      return [
        { value: 'boys', label: 'Boys Hostel' },
        { value: 'girls', label: 'Girls Hostel' }
      ];
    }
  };

  // Effect to auto-select hostel type when gender changes
  useEffect(() => {
    if (formData.gender === 'male' && formData.hostelType !== 'boys') {
      setFormData(prev => ({ ...prev, hostelType: 'boys' }));
    } else if (formData.gender === 'female' && formData.hostelType !== 'girls') {
      setFormData(prev => ({ ...prev, hostelType: 'girls' }));
    }
  }, [formData.gender]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    // Clear error when field is being changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }

    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError('');
    }

    // Special handling for gender change
    if (name === 'gender') {
      // Clear hostel type error if it exists
      if (errors.hostelType) {
        setErrors(prev => ({
          ...prev,
          hostelType: null
        }));
      }
    }
  };

  const validateGenderHostelMatch = () => {
    if (formData.gender && formData.hostelType) {
      if (formData.gender === 'male' && formData.hostelType !== 'boys') {
        return 'Male students can only book Boys Hostel';
      }
      if (formData.gender === 'female' && formData.hostelType !== 'girls') {
        return 'Female students can only book Girls Hostel';
      }
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'fullName', 'studentId', 'email', 'phone', 'gender', 
      'department', 'semester', 'startDate', 'endDate', 'roomPreference', 'hostelType',
      'emergencyContactName', 'emergencyContactPhone'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10,11}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-11 digit phone number';
    }
    
    // Student ID validation
    if (formData.studentId && !/^[A-Za-z0-9-]+$/.test(formData.studentId)) {
      newErrors.studentId = 'Please enter a valid student ID';
    }

    // Date validation
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDate < today) {
        newErrors.startDate = 'Check-in date cannot be in the past';
      }

      if (endDate <= startDate) {
        newErrors.endDate = 'Check-out date must be after check-in date';
      }
    }

    // Gender-Hostel Type validation
    const genderHostelError = validateGenderHostelMatch();
    if (genderHostelError) {
      newErrors.hostelType = genderHostelError;
    }
    
    // Terms agreement validation
    if (!formData.agreesToTerms) {
      newErrors.agreesToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Prepare data in the format expected by backend controller
      const bookingData = {
        roomType: formData.roomPreference,
        hostelType: formData.hostelType,
        checkInDate: formData.startDate,
        checkOutDate: formData.endDate,
        duration: parseInt(formData.duration),
        specialRequests: formData.specialRequirements
      };

      console.log('Sending booking data:', bookingData);

      // Call the API
      const response = await bookingService.createBooking(bookingData);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Call parent onSubmit if provided
      if (onSubmit) {
        onSubmit(response);
      }
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          studentId: '',
          email: '',
          phone: '',
          gender: '',
          department: '',
          semester: '',
          startDate: '',
          endDate: '',
          hostelType: '',
          duration: '1',
          emergencyContactName: '',
          emergencyContactPhone: '',
          address: '',
          roomPreference: selectedRoom || '',
          specialRequirements: '',
          agreesToTerms: false
        });
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitError(error.message || 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableHostelOptions = getAvailableHostelOptions(formData.gender);
  const isHostelTypeDisabled = formData.gender === 'male' || formData.gender === 'female';

  return (
    <div style={styles.formContainer}>
      {submitSuccess && (
        <div style={styles.successMessage}>
          Your booking request has been submitted successfully! We will contact you shortly.
        </div>
      )}
      
      {submitError && (
        <div style={styles.errorMessage}>
          {submitError}
        </div>
      )}
      
      <h2 style={styles.title}>Hostel Room Booking Form</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Personal Information</h3>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'fullName' ? styles.inputFocus : {}),
                  ...(errors.fullName ? { borderColor: '#e74c3c' } : {})
                }}
                onFocus={() => setFocusedInput('fullName')}
                onBlur={() => setFocusedInput(null)}
              />
              {errors.fullName && <div style={styles.error}>{errors.fullName}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="studentId">Student ID *</label>
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
                  ...(errors.studentId ? { borderColor: '#e74c3c' } : {})
                }}
                onFocus={() => setFocusedInput('studentId')}
                onBlur={() => setFocusedInput(null)}
              />
              {errors.studentId && <div style={styles.error}>{errors.studentId}</div>}
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">Email *</label>
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
                  ...(errors.email ? { borderColor: '#e74c3c' } : {})
                }}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
              {errors.email && <div style={styles.error}>{errors.email}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="phone">Phone Number *</label>
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
                  ...(errors.phone ? { borderColor: '#e74c3c' } : {})
                }}
                onFocus={() => setFocusedInput('phone')}
                onBlur={() => setFocusedInput(null)}
              />
              {errors.phone && <div style={styles.error}>{errors.phone}</div>}
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.select,
                  ...(errors.gender ? { borderColor: '#e74c3c' } : {})
                }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <div style={styles.error}>{errors.gender}</div>}
              
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.select,
                  ...(errors.department ? { borderColor: '#e74c3c' } : {})
                }}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Other">Other</option>
              </select>
              {errors.department && <div style={styles.error}>{errors.department}</div>}
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="semester">Semester *</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.select,
                  ...(errors.semester ? { borderColor: '#e74c3c' } : {})
                }}
              >
                <option value="">Select Semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
              {errors.semester && <div style={styles.error}>{errors.semester}</div>}
            </div>
          </div>
        </div>
        
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Booking Details</h3>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="hostelType">Hostel Type *</label>
              <select
                id="hostelType"
                name="hostelType"
                value={formData.hostelType}
                onChange={handleChange}
                disabled={isSubmitting || isHostelTypeDisabled}
                style={{
                  ...styles.select,
                  ...(isHostelTypeDisabled ? styles.selectDisabled : {}),
                  ...(errors.hostelType ? { borderColor: '#e74c3c' } : {})
                }}
              >
                <option value="">Select Hostel Type</option>
                {availableHostelOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.hostelType && <div style={styles.error}>{errors.hostelType}</div>}
              {isHostelTypeDisabled && (
                <div style={styles.infoText}>
                  Hostel type is automatically selected based on your gender
                </div>
              )}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="roomPreference">Room Type *</label>
              <select
                id="roomPreference"
                name="roomPreference"
                value={formData.roomPreference}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.select,
                  ...(errors.roomPreference ? { borderColor: '#e74c3c' } : {})
                }}
              >
                <option value="">Select Room Type</option>
                <option value="double">Double Bed Room</option>
                <option value="fourth">Four Bed Room</option>
                <option value="sixth">Six Bed Room</option>
              </select>
              {errors.roomPreference && <div style={styles.error}>{errors.roomPreference}</div>}
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="startDate">Check-in Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'startDate' ? styles.inputFocus : {}),
                  ...(errors.startDate ? { borderColor: '#e74c3c' } : {})
                }}
                onFocus={() => setFocusedInput('startDate')}
                onBlur={() => setFocusedInput(null)}
              />
              {errors.startDate && <div style={styles.error}>{errors.startDate}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="endDate">Check-out Date *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'endDate' ? styles.inputFocus : {}),
                  ...(errors.endDate ? { borderColor: '#e74c3c' } : {})
                }}
                onFocus={() => setFocusedInput('endDate')}
                onBlur={() => setFocusedInput(null)}
              />
              {errors.endDate && <div style={styles.error}>{errors.endDate}</div>}
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="duration">Duration (in semesters) *</label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                disabled={isSubmitting}
                style={styles.select}
              >
                <option value="1">1 Semester</option>
                <option value="2">2 Semesters</option>
                <option value="4">Full Academic Year</option>
              </select>
            </div>
          </div>
        </div>
        
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Emergency Contact</h3>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="emergencyContactName">Emergency Contact Name *</label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'emergencyContactName' ? styles.inputFocus : {}),
                  ...(errors.emergencyContactName ? { borderColor: '#e74c3c' } : {})
                }}
                onFocus={() => setFocusedInput('emergencyContactName')}
                onBlur={() => setFocusedInput(null)}
              />
              {errors.emergencyContactName && <div style={styles.error}>{errors.emergencyContactName}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="emergencyContactPhone">Emergency Contact Phone *</label>
              <input
                type="tel"
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'emergencyContactPhone' ? styles.inputFocus : {}),
                  ...(errors.emergencyContactPhone ? { borderColor: '#e74c3c' } : {})
                }}
                onFocus={() => setFocusedInput('emergencyContactPhone')}
                onBlur={() => setFocusedInput(null)}
              />
              {errors.emergencyContactPhone && <div style={styles.error}>{errors.emergencyContactPhone}</div>}
            </div>
          </div>
        </div>
        
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Additional Information</h3>
          
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, ...styles.fullWidth}}>
              <label style={styles.label} htmlFor="address">Permanent Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'address' ? styles.inputFocus : {})
                }}
                onFocus={() => setFocusedInput('address')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, ...styles.fullWidth}}>
              <label style={styles.label} htmlFor="specialRequirements">Special Requirements or Medical Conditions</label>
              <textarea
                id="specialRequirements"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{
                  ...styles.textarea,
                  ...(focusedInput === 'specialRequirements' ? styles.inputFocus : {})
                }}
                onFocus={() => setFocusedInput('specialRequirements')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>
        </div>
        
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="agreesToTerms"
            name="agreesToTerms"
            checked={formData.agreesToTerms}
            onChange={handleChange}
            disabled={isSubmitting}
            style={styles.checkbox}
          />
          <label htmlFor="agreesToTerms" style={styles.termsText}>
            I agree to the hostel rules and regulations, and confirm that all provided information is accurate. *
          </label>
        </div>
        {errors.agreesToTerms && <div style={styles.error}>{errors.agreesToTerms}</div>}
        
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.submitBtn,
            ...(isSubmitting ? styles.submitBtnDisabled : {}),
            ...(isHoveringSubmit && !isSubmitting ? styles.submitBtnHover : {})
          }}
          onMouseEnter={() => setIsHoveringSubmit(true)}
          onMouseLeave={() => setIsHoveringSubmit(false)}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;