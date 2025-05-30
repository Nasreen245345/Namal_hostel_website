import React from 'react';
import exterior from '../../assets/images/exterior.jpg'
import night from '../../assets/images/night.jpg'

const Hero = () => {
  const heroStyles = {
    container: {
  width: '100vw', // ✅ This prevents overflow
  height: '600px',
  position: 'relative',
  display: 'flex',
  left: 0,
  margin: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${night})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  textAlign: 'center',
  // padding: '90px',
},
    content: {
      maxWidth: '800px',
      padding: '0 20px',
      zIndex: 2,
      
      
    },
    heading: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '0rem',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
       color:'white',
    },
    subheading: {
      fontSize: '1.5rem',
       marginBottom: '25rem',

      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
      
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    },
    button: {
      padding: '12px 24px',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '5px',
      border: '4px solid black',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    primaryButton: {
      backgroundColor: 'white',
      color: 'black',
    },
    secondaryButton: {
      backgroundColor: 'white',
      color: 'black',
      border: '4px solid black',
    },
    '@media (max-width: 768px)': {
      heading: {
        fontSize: '2rem',
      },
      subheading: {
        fontSize: '1.2rem',
      },
    }
  };

  // Apply media queries manually
  const getMobileStyles = () => {
    if (window.innerWidth <= 768) {
      return {
        ...heroStyles,
        heading: {
          ...heroStyles.heading,
          fontSize: '2rem',
          
        },
        subheading: {
          ...heroStyles.subheading,
          fontSize: '1.2rem',
        }
      };
    }
    return heroStyles;
  };

  return (
    <div style={heroStyles.container}>
      <div style={heroStyles.content}>
        <h1 style={heroStyles.heading}>Welcome to Namal Residency</h1>
        <p style={heroStyles.subheading}>Your home away from home, providing comfortable living with modern facilities for students.</p>
        <div style={heroStyles.buttonContainer}>
          <button 
            style={{...heroStyles.button, ...heroStyles.primaryButton}}
            onClick={() => window.location.href = '/room-booking'}
          >
            Book a Room
          </button>
          <button 
            style={{...heroStyles.button, ...heroStyles.secondaryButton}}
            onClick={() => window.location.href = '/hostel-info'}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;