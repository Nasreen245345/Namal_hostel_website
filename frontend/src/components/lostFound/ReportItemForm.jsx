import React, { useState } from 'react';
import lostFoundService from '../../services/lostFoundService'; // Import the service

const ReportItemForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    date: '',
    location: '',
    description: '',
    itemColor: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    itemImage: null,
    itemType: 'lost', // 'lost' or 'found'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Updated to match backend model enum values exactly
  const categoryOptions = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Books & Stationery', value: 'stationery' },
    { label: 'Clothing & Accessories', value: 'clothing' },
    { label: 'Personal Items', value: 'accessories' },
    { label: 'ID Cards & Documents', value: 'documents' },
    { label: 'Keys', value: 'keys' },
    { label: 'Bags & Luggage', value: 'other' },
    { label: 'Other', value: 'other' }
  ];

  // Updated to match expected location format
  const locationOptions = [
    { label: 'Boys Hostel - Block A', value: 'Boys Hostel Block A' },
    { label: 'Boys Hostel - Block B', value: 'Boys Hostel Block B' },
    { label: 'Girls Hostel', value: 'Girls Hostel' },
    { label: 'Cafeteria', value: 'Cafeteria' },
    { label: 'Library', value: 'Library' },
    { label: 'Academic Block', value: 'Academic Block' },
    { label: 'Sports Complex', value: 'Sports Complex' },
    { label: 'Campus Grounds', value: 'Campus Grounds' },
    { label: 'Shuttle/Bus', value: 'Shuttle/Bus' },
    { label: 'Other', value: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.itemName.trim()) {
      tempErrors.itemName = 'Item name is required';
      isValid = false;
    }

    if (!formData.category) {
      tempErrors.category = 'Please select a category';
      isValid = false;
    }

    if (!formData.date) {
      tempErrors.date = 'Date is required';
      isValid = false;
    }

    if (!formData.location) {
      tempErrors.location = 'Location is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      tempErrors.description = 'Description is required';
      isValid = false;
    } else if (formData.description.trim().length < 10) {
      tempErrors.description = 'Description should be at least 10 characters';
      isValid = false;
    }

    if (!formData.contactName.trim()) {
      tempErrors.contactName = 'Your name is required';
      isValid = false;
    }

    if (!formData.contactEmail.trim()) {
      tempErrors.contactEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      tempErrors.contactEmail = 'Email is invalid';
      isValid = false;
    }

    // Validate file size if image is uploaded
    if (formData.itemImage && formData.itemImage.size > 5 * 1024 * 1024) {
      tempErrors.itemImage = 'Image file size should not exceed 5MB';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        // Use the service to submit the form
        await lostFoundService.createItem(formData);
        
        setSubmitSuccess(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            itemName: '',
            category: '',
            date: '',
            location: '',
            description: '',
            itemColor: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            itemImage: null,
            itemType: 'lost',
          });
          setSubmitSuccess(false);
          // Reset file input
          const fileInput = document.querySelector('input[type="file"]');
          if (fileInput) fileInput.value = '';
        }, 3000);
        
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError(
          error.response?.data?.message || 
          error.message ||
          'Failed to submit the report. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
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
    formHeader: {
      marginBottom: '1.5rem',
    },
    formTitle: {
      fontSize: '1.5rem',
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '0.5rem',
    },
    formDescription: {
      color: '#7f8c8d',
      textAlign: 'center',
    },
    tabs: {
      display: 'flex',
      marginBottom: '2rem',
      borderBottom: '1px solid #e0e0e0',
    },
    tab: {
      flex: 1,
      padding: '1rem',
      textAlign: 'center',
      cursor: 'pointer',
      borderBottom: '3px solid transparent',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    activeTab: {
      borderColor: '#3498db',
      color: '#3498db',
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
      flexWrap: 'wrap',
      gap: '1rem',
    },
    formCol: {
      flex: '1 1 300px',
      minWidth: '250px',
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
      minHeight: '120px',
      resize: 'vertical',
      fontFamily: 'inherit',
    },
    fileInput: {
      padding: '0.75rem',
      border: '1px dashed #dce0e3',
      borderRadius: '4px',
      cursor: 'pointer',
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
    buttonHover: {
      backgroundColor: '#2980b9',
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
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '1rem',
      borderRadius: '4px',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    fileInfo: {
      marginTop: '0.5rem',
      fontSize: '0.85rem',
      color: '#7f8c8d',
    },
    required: {
      color: '#e74c3c',
      marginLeft: '3px',
    },
    note: {
      fontSize: '0.85rem',
      color: '#7f8c8d',
      marginTop: '0.5rem',
    }
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.formHeader}>
        <h2 style={styles.formTitle}>Report Lost or Found Item</h2>
        <p style={styles.formDescription}>Complete this form with as much detail as possible to help us reunite items with their owners.</p>
      </div>
      
      <div style={styles.tabs}>
        <div 
          style={{
            ...styles.tab,
            ...(formData.itemType === 'lost' ? styles.activeTab : {})
          }}
          onClick={() => setFormData({ ...formData, itemType: 'lost' })}
        >
          Report Lost Item
        </div>
        <div 
          style={{
            ...styles.tab,
            ...(formData.itemType === 'found' ? styles.activeTab : {})
          }}
          onClick={() => setFormData({ ...formData, itemType: 'found' })}
        >
          Report Found Item
        </div>
      </div>

      {submitSuccess && (
        <div style={styles.successMessage}>
          Your item has been reported successfully! Our team will contact you if there's a match.
        </div>
      )}

      {submitError && (
        <div style={styles.errorMessage}>
          {submitError}
        </div>
      )}
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formRow}>
          <div style={styles.formCol}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Item Name<span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.itemName ? { border: '1px solid #e74c3c' } : {})
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                placeholder="e.g. Blue Calculator, Samsung Phone"
              />
              {errors.itemName && <p style={styles.errorText}>{errors.itemName}</p>}
            </div>
          </div>
          
          <div style={styles.formCol}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Category<span style={styles.required}>*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  ...styles.select,
                  ...(errors.category ? { border: '1px solid #e74c3c' } : {})
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category, index) => (
                  <option key={index} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && <p style={styles.errorText}>{errors.category}</p>}
            </div>
          </div>
        </div>
        
        <div style={styles.formRow}>
          <div style={styles.formCol}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Date {formData.itemType === 'lost' ? 'Lost' : 'Found'}<span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.date ? { border: '1px solid #e74c3c' } : {})
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.date && <p style={styles.errorText}>{errors.date}</p>}
            </div>
          </div>
          
          <div style={styles.formCol}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Location<span style={styles.required}>*</span>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={{
                  ...styles.select,
                  ...(errors.location ? { border: '1px solid #e74c3c' } : {})
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              >
                <option value="">Select Location</option>
                {locationOptions.map((location, index) => (
                  <option key={index} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
              {errors.location && <p style={styles.errorText}>{errors.location}</p>}
            </div>
          </div>
        </div>
        
        <div style={styles.formRow}>
          <div style={styles.formCol}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Color of Item
              </label>
              <input
                type="text"
                name="itemColor"
                value={formData.itemColor}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                placeholder="e.g. Black, Blue, Silver"
              />
            </div>
          </div>
          
          <div style={styles.formCol}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Upload Image
              </label>
              <input
                type="file"
                name="itemImage"
                onChange={handleChange}
                style={{
                  ...styles.fileInput,
                  ...(errors.itemImage ? { border: '1px solid #e74c3c' } : {})
                }}
                accept="image/*"
              />
              {errors.itemImage && <p style={styles.errorText}>{errors.itemImage}</p>}
              <p style={styles.fileInfo}>Upload a clear image of the item (Max: 5MB)</p>
            </div>
          </div>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Description<span style={styles.required}>*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              ...styles.textarea,
              ...(errors.description ? { border: '1px solid #e74c3c' } : {})
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)'}
            onBlur={(e) => e.target.style.boxShadow = 'none'}
            placeholder={`Please provide detailed information about the ${formData.itemType} item, including any identifying features, brand, model, and other relevant details.`}
          />
          {errors.description && <p style={styles.errorText}>{errors.description}</p>}
          <p style={styles.note}>Minimum 10 characters required.</p>
        </div>
        
        <div style={{ ...styles.formGroup, marginTop: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#2c3e50', marginBottom: '1rem' }}>Contact Information</h3>
        </div>
        
        <div style={styles.formRow}>
          <div style={styles.formCol}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Your Name<span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.contactName ? { border: '1px solid #e74c3c' } : {})
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                placeholder="Your full name"
              />
              {errors.contactName && <p style={styles.errorText}>{errors.contactName}</p>}
            </div>
          </div>
          
          <div style={styles.formCol}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Email Address<span style={styles.required}>*</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.contactEmail ? { border: '1px solid #e74c3c' } : {})
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                placeholder="Your email address"
              />
              {errors.contactEmail && <p style={styles.errorText}>{errors.contactEmail}</p>}
            </div>
          </div>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Phone Number
          </label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            style={styles.input}
            onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)'}
            onBlur={(e) => e.target.style.boxShadow = 'none'}
            placeholder="Your phone number"
          />
          <p style={styles.note}>Optional, but recommended for quicker communication.</p>
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
            {isSubmitting ? 'Submitting...' : `Submit ${formData.itemType === 'lost' ? 'Lost' : 'Found'} Report`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportItemForm;