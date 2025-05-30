import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';
import Namallogo from '../assets/images/Namal-logo.png'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const { login } = useContext(AuthContext); // Changed from setUser to login
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
    // Clear login error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Call authService.login which returns { user, token }
        const response = await authService.login(formData.email, formData.password);
        
        // Use the login function from AuthContext
        login(response.user, response.token);
        
        // Navigate to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        setLoginError(error.message || 'Invalid credentials. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginCard}>
        <div style={styles.logoContainer}>
          <img src={Namallogo} alt="Namal Hostel Logo" style={styles.logo} />
          <h1 style={styles.heading}>Welcome Back</h1>
          <p style={styles.subHeading}>Login to access your hostel dashboard</p>
        </div>
        
        {loginError && <div style={styles.errorAlert}>{loginError}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
            required
          />
          
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter your password"
            required
          />
          
          <div style={styles.forgotPassword}>
            <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? <Loader size="small" color="#ffffff" /> : 'Login'}
          </Button>
          
          <div style={styles.registerPrompt}>
            Don't have an account? 
            <Link to="/register" style={styles.link}> Register now</Link>
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
  loginCard: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    padding: '40px 30px',
  },
  logoContainer: {
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
  forgotPassword: {
    textAlign: 'right',
    marginTop: '-10px',
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
  registerPrompt: {
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
};

export default LoginPage;