import React, { useState, useContext } from 'react';
import complaintService from '../../services/complaintService';
import { AuthContext } from '../../context/AuthContext';

const ComplaintForm = () => {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    studentName: user?.name || '',
    studentId: '',
    email: user?.email || '', // Changed back to 'email' to match controller
    phone: '',
    roomNumber: '',
    complaintType: '', // Changed back to 'complaintType' to match controller
    priority: 'medium',
    title: '',
    description: '',
    expectedResolutionDate: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const complaintTypes = [
    'plumbing_issues',
    'electrical_problems', 
    'furniture_damage',
    'cleaning_services',
    'wifi_connectivity',
    'air_conditioning',
    'noise_complaints',
    'security_concerns',
    'roommate_issues',
    'others'
  ];

  const complaintTypeLabels = {
    'plumbing_issues': 'Plumbing Issues',
    'electrical_problems': 'Electrical Problems',
    'furniture_damage': 'Furniture Damage',
    'cleaning_services': 'Cleaning Services',
    'wifi_connectivity': 'WiFi Connectivity',
    'air_conditioning': 'Air Conditioning/Heating',
    'noise_complaints': 'Noise Complaints',
    'security_concerns': 'Security Concerns',
    'roommate_issues': 'Roommate Issues',
    'others': 'Others'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.studentName.trim()) {
      tempErrors.studentName = 'Student name is required';
      isValid = false;
    }

    if (!formData.studentId.trim()) {
      tempErrors.studentId = 'Student ID is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      tempErrors.phone = 'Phone number is invalid';
      isValid = false;
    }

    if (!formData.roomNumber.trim()) {
      tempErrors.roomNumber = 'Room number is required';
      isValid = false;
    }

    if (!formData.complaintType) {
      tempErrors.complaintType = 'Please select a complaint category';
      isValid = false;
    }

    if (!formData.title.trim()) {
      tempErrors.title = 'Complaint title is required';
      isValid = false;
    } else if (formData.title.trim().length < 5) {
      tempErrors.title = 'Title should be at least 5 characters';
      isValid = false;
    }

    if (!formData.description.trim()) {
      tempErrors.description = 'Description is required';
      isValid = false;
    } else if (formData.description.trim().length < 20) {
      tempErrors.description = 'Description should be at least 20 characters';
      isValid = false;
    }

    if (!formData.expectedResolutionDate) {
      tempErrors.expectedResolutionDate = 'Expected resolution date is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const complaintData = {
        studentName: formData.studentName.trim(),
        studentId: formData.studentId.trim(),
        email: formData.email.trim(), // Changed back to 'email'
        phone: formData.phone.trim(),
        roomNumber: formData.roomNumber.trim(),
        complaintType: formData.complaintType, // Changed back to 'complaintType'
        priority: formData.priority,
        title: formData.title.trim(),
        description: formData.description.trim(),
        expectedResolutionDate: formData.expectedResolutionDate
      };

      console.log('Submitting complaint data:', complaintData); // Debug log

      const response = await complaintService.createComplaint(complaintData);
      
      if (response.success) {
        setSubmitSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            studentName: user?.name || '',
            studentId: '',
            email: user?.email || '',
            phone: '',
            roomNumber: '',
            complaintType: '',
            priority: 'medium',
            title: '',
            description: '',
            expectedResolutionDate: '',
          });
          setSubmitSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setSubmitError(error.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    formContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    formTitle: {
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    formRow: {
      display: 'flex',
      flexDirection: 'row',
      gap: '1rem',
      flexWrap: 'wrap',
    },
    formColumn: {
      flex: '1 1 300px',
    },
    label: {
      fontWeight: '600',
      fontSize: '0.9rem',
      color: '#34495e',
      marginBottom: '0.25rem',
    },
    input: {
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #dce0e3',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
    },
    select: {
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #dce0e3',
      fontSize: '1rem',
      backgroundColor: '#fff',
      cursor: 'pointer',
    },
    textarea: {
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #dce0e3',
      fontSize: '1rem',
      minHeight: '150px',
      resize: 'vertical',
      fontFamily: 'inherit',
    },
    radioGroup: {
      display: 'flex',
      gap: '1.5rem',
      marginTop: '0.5rem',
      flexWrap: 'wrap',
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
    },
    radio: {
      cursor: 'pointer',
      accentColor: '#3498db',
    },
    button: {
      padding: '0.9rem 1.5rem',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
    },
    buttonDisabled: {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
    },
    errorText: {
      color: '#e74c3c',
      fontSize: '0.85rem',
      marginTop: '0.25rem',
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '1rem',
      borderRadius: '4px',
      marginBottom: '1rem',
      textAlign: 'center',
      border: '1px solid #c3e6cb',
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '1rem',
      borderRadius: '4px',
      marginBottom: '1rem',
      textAlign: 'center',
      border: '1px solid #f5c6cb',
    },
    note: {
      fontSize: '0.85rem',
      color: '#7f8c8d',
      marginTop: '0.5rem',
    },
    required: {
      color: '#e74c3c',
      marginLeft: '3px',
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.formTitle}>Submit a Complaint</h2>
      
      {submitSuccess && (
        <div style={styles.successMessage}>
          Your complaint has been submitted successfully! Our team will address it shortly.
        </div>
      )}

      {submitError && (
        <div style={styles.errorMessage}>
          {submitError}
        </div>
      )}
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formRow}>
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Student Name<span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.studentName ? { border: '1px solid #e74c3c' } : {})
                }}
                placeholder="Enter your full name"
              />
              {errors.studentName && <p style={styles.errorText}>{errors.studentName}</p>}
            </div>
          </div>
          
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Student ID<span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.studentId ? { border: '1px solid #e74c3c' } : {})
                }}
                placeholder="Enter your student ID (e.g., NUM-BSCS-2022-10)"
              />
              {errors.studentId && <p style={styles.errorText}>{errors.studentId}</p>}
            </div>
          </div>
        </div>
        
        <div style={styles.formRow}>
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Email Address<span style={styles.required}>*</span>
              </label>
              <input
                type="email"
                name="email" // Changed back to 'email'
                value={formData.email}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.email ? { border: '1px solid #e74c3c' } : {})
                }}
                placeholder="Enter your email address"
              />
              {errors.email && <p style={styles.errorText}>{errors.email}</p>}
            </div>
          </div>
          
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Phone Number<span style={styles.required}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.phone ? { border: '1px solid #e74c3c' } : {})
                }}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}
            </div>
          </div>
        </div>
        
        <div style={styles.formRow}>
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Room Number<span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.roomNumber ? { border: '1px solid #e74c3c' } : {})
                }}
                placeholder="e.g., A-101"
              />
              {errors.roomNumber && <p style={styles.errorText}>{errors.roomNumber}</p>}
            </div>
          </div>
          
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Complaint Category<span style={styles.required}>*</span>
              </label>
              <select
                name="complaintType" // Changed back to 'complaintType'
                value={formData.complaintType}
                onChange={handleChange}
                style={{
                  ...styles.select,
                  ...(errors.complaintType ? { border: '1px solid #e74c3c' } : {})
                }}
              >
                <option value="">Select Complaint Category</option>
                {complaintTypes.map((type) => (
                  <option key={type} value={type}>
                    {complaintTypeLabels[type]}
                  </option>
                ))}
              </select>
              {errors.complaintType && <p style={styles.errorText}>{errors.complaintType}</p>}
            </div>
          </div>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Complaint Title<span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{
              ...styles.input,
              ...(errors.title ? { border: '1px solid #e74c3c' } : {})
            }}
            placeholder="Brief title describing the issue"
          />
          {errors.title && <p style={styles.errorText}>{errors.title}</p>}
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Description of Issue<span style={styles.required}>*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              ...styles.textarea,
              ...(errors.description ? { border: '1px solid #e74c3c' } : {})
            }}
            placeholder="Please provide detailed information about your complaint..."
          />
          {errors.description && <p style={styles.errorText}>{errors.description}</p>}
          <p style={styles.note}>Minimum 20 characters required.</p>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Priority Level</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="priority"
                value="low"
                checked={formData.priority === 'low'}
                onChange={handleChange}
                style={styles.radio}
              />
              Low
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="priority"
                value="medium"
                checked={formData.priority === 'medium'}
                onChange={handleChange}
                style={styles.radio}
              />
              Medium
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="priority"
                value="high"
                checked={formData.priority === 'high'}
                onChange={handleChange}
                style={styles.radio}
              />
              High
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="priority"
                value="urgent"
                checked={formData.priority === 'urgent'}
                onChange={handleChange}
                style={styles.radio}
              />
              Urgent
            </label>
          </div>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Expected Resolution Date<span style={styles.required}>*</span>
          </label>
          <input
            type="date"
            name="expectedResolutionDate"
            value={formData.expectedResolutionDate}
            onChange={handleChange}
            style={{
              ...styles.input,
              ...(errors.expectedResolutionDate ? { border: '1px solid #e74c3c' } : {})
            }}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.expectedResolutionDate && <p style={styles.errorText}>{errors.expectedResolutionDate}</p>}
          <p style={styles.note}>When would you like this issue to be resolved?</p>
        </div>
        
        <div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isSubmitting ? styles.buttonDisabled : {})
            }}
            disabled={isSubmitting}
            onMouseOver={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = '#2980b9';
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = '#3498db';
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;