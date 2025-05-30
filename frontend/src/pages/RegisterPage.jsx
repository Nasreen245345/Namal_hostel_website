import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { AuthContext } from '../context/AuthContext';
import authService from '/src/services/authService.js'; // Fixed import
import Namallogo from '../assets/images/Namal-logo.png'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    gender: '',
    department: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setSuccessMessage('');
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const userData = await authService.register({ // Fixed function call
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          studentId: formData.studentId,
          password: formData.password,
          gender: formData.gender,
          department: formData.department
        });
        
        setSuccessMessage('Registration successful! Redirecting to dashboard...');
        
        // Simulate a delay before redirecting
        setTimeout(() => {
          setUser(userData);
          navigate('/dashboard');
        }, 2000);
        
      } catch (error) {
        setRegisterError(error.message || 'Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.registerCard}>
        <div style={styles.headerContainer}>
          <img src={Namallogo} alt="Namal Hostel Logo" style={styles.logo} />
          <h1 style={styles.heading}>Create Your Account</h1>
          <p style={styles.subHeading}>Join Namal Hostel community</p>
        </div>
        
        {registerError && <div style={styles.errorAlert}>{registerError}</div>}
        {successMessage && <div style={styles.successAlert}>{successMessage}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formRow}>
            <div style={styles.formColumn}>
              <FormInput
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="First name"
                required
              />
            </div>
            <div style={styles.formColumn}>
              <FormInput
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="Last name"
                required
              />
            </div>
          </div>
          
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="university email"
            required
          />
          
          <FormInput
            label="Student ID"
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            error={errors.studentId}
            placeholder="Your student ID"
            required
          />
          
          <div style={styles.formRow}>
            <div style={styles.formColumn}>
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Create password"
                required
              />
            </div>
            <div style={styles.formColumn}>
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formColumn}>
              <label style={styles.selectLabel}>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={errors.gender ? {...styles.selectInput, ...styles.inputError} : styles.selectInput}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <span style={styles.errorText}>{errors.gender}</span>}
            </div>
            
            <div style={styles.formColumn}>
              <label style={styles.selectLabel}>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={errors.department ? {...styles.selectInput, ...styles.inputError} : styles.selectInput}
                required
              >
                <option value="">Select Department</option>
                <option value="cs">Computer Science</option>
                <option value="ee">Electrical Engineering</option>
                <option value="me">Mechanical Engineering</option>
                <option value="business">Business Administration</option>
                <option value="mathematics">Mathematics</option>
              </select>
              {errors.department && <span style={styles.errorText}>{errors.department}</span>}
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? <Loader size="small" color="#ffffff" /> : 'Register'}
          </Button>
          
          <div style={styles.loginPrompt}>
            Already have an account? 
            <Link to="/login" style={styles.link}> Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

// Internal CSS styling object
const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f7fa',
  },
  registerCard: {
    width: '100%',
    maxWidth: '700px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    padding: '40px',
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  logo: {
    width: '80px',
    height: 'auto',
    marginBottom: '16px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 10px 0',
  },
  subHeading: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formRow: {
    display: 'flex',
    gap: '20px',
    width: '100%',
    flexDirection: 'row',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  formColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  selectLabel: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50',
  },
  selectInput: {
    padding: '12px 16px',
    borderRadius: '6px',
    border: '1px solid #dcdfe6',
    fontSize: '15px',
    color: '#2c3e50',
    transition: 'border-color 0.3s',
    outline: 'none',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23333\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpath d=\'M6 9l6 6 6-6\'/%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '16px',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '12px',
    marginTop: '4px',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '15px',
    color: '#7f8c8d',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '600',
  },
  errorAlert: {
    backgroundColor: '#ffecee',
    color: '#e74c3c',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
  },
  successAlert: {
    backgroundColor: '#e6f7ef',
    color: '#27ae60',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
  },
};

export default RegisterPage;