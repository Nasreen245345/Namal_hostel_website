import React from 'react';
import Namal_exterior from '../../assets/images/Namal_exterior.jpg'
const AboutSection = () => {
  const styles = {
    section: {
      padding: '80px 0',
      backgroundColor: '#f8f9fa',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '50px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#6b7280',
      maxWidth: '700px',
      margin: '0 auto',
    },
    content: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '30px',
    },
    textContent: {
      flex: '1 1 500px',
    },
    paragraph: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: '#4b5563',
      marginBottom: '20px',
    },
    highlight: {
      fontWeight: 'bold',
      color: '#1e3a8a',
    },
    imageContainer: {
      flex: '1 1 400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      maxWidth: '100%',
      height: '80%',
      borderRadius: '10px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginTop: '30px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 0',
    },
    featureIcon: {
      marginRight: '10px',
      color: '#1e3a8a',
      fontSize: '1.5rem',
    },
    featureText: {
      fontSize: '1rem',
      color: '#4b5563',
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.heading}>
          <h2 style={styles.title}>About Namal Residency</h2>
          <p style={styles.subtitle}>Providing quality accommodation for students since 2007</p>
        </div>

        <div style={styles.content}>
          <div style={styles.textContent}>
            <p style={styles.paragraph}>
              Namal Residency offers a <span style={styles.highlight}>comfortable and secure</span> living environment for students of Namal University. Our hostels are designed to provide all the necessary facilities that make your academic journey smoother and more enjoyable.
            </p>
            <p style={styles.paragraph}>
              We understand that a conducive living environment is crucial for academic success. That's why our hostels are equipped with modern amenities, study areas, and recreational facilities to ensure a balanced lifestyle for our residents.
            </p>
            <p style={styles.paragraph}>
              With separate accommodations for boys and girls, we maintain the highest standards of safety and comfort. Our dedicated staff works around the clock to ensure that your stay at Namal Residency is memorable and hassle-free.
            </p>

            <div style={styles.featuresGrid}>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>24/7 Security</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>Clean Environment</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>Study Areas</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>High-Speed WiFi</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>Healthy Meals</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>Recreational Facilities</span>
              </div>
            </div>
          </div>

          <div style={styles.imageContainer}>
            <img 
              src={Namal_exterior}
              alt="Namal Hostel Building" 
              style={styles.image} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;