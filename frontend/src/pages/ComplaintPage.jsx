import React from 'react';

import ComplaintForm from '../components/complaint/ComplaintForm';

const ComplaintPage = () => {
  const styles = {
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    mainContent: {
      flex: 1,
      paddingTop: '2rem',
      paddingBottom: '4rem',
      background: 'linear-gradient(to bottom, #f5f7fa, #ffffff)',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2.5rem',
    },
    title: {
      fontSize: '2.5rem',
      color: '#2c3e50',
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#7f8c8d',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    separator: {
      width: '80px',
      height: '4px',
      background: '#3498db',
      margin: '1.5rem auto',
      borderRadius: '2px',
    },
    infoSection: {
      marginBottom: '3rem',
    },
    infoCard: {
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    infoGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
      justifyContent: 'center',
    },
    infoBox: {
      flex: '1 1 300px',
      maxWidth: '350px',
      padding: '1.5rem',
      background: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    infoIcon: {
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      background: '#3498db',
      color: 'white',
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },
    infoTitle: {
      fontSize: '1.25rem',
      color: '#2c3e50',
      marginBottom: '0.75rem',
      fontWeight: '600',
    },
    infoDescription: {
      color: '#7f8c8d',
      lineHeight: '1.6',
    },
    emergencyBox: {
      background: '#fef2f2',
      border: '1px solid #fee2e2',
      borderRadius: '8px',
      padding: '1.5rem',
      marginTop: '3rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    emergencyIcon: {
      color: '#dc2626',
      fontSize: '2rem',
    },
    emergencyContact: {
      fontWeight: 'bold',
      color: '#dc2626',
    },
    faqSection: {
      marginTop: '4rem',
    },
    faqTitle: {
      fontSize: '1.75rem',
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    faqList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    faqItem: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    faqQuestion: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '0.75rem',
    },
    faqAnswer: {
      color: '#7f8c8d',
      lineHeight: '1.6',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <main style={styles.mainContent}>
        <div style={styles.container}>
          <header style={styles.header}>
            <h1 style={styles.title}>Complaint Management</h1>
            <div style={styles.separator}></div>
            <p style={styles.subtitle}>
              We value your feedback and are committed to providing a comfortable living environment.
              Please use the form below to report any issues or concerns you're experiencing.
            </p>
          </header>

          <section style={styles.infoSection}>
            <div style={styles.infoGrid}>
              <div style={styles.infoBox}>
                <div style={styles.infoIcon}>
                  <span>⏱️</span>
                </div>
                <h3 style={styles.infoTitle}>24-Hour Response</h3>
                <p style={styles.infoDescription}>
                  We aim to address all complaints within 24 hours of submission. Emergency issues are handled on priority.
                </p>
              </div>

              <div style={styles.infoBox}>
                <div style={styles.infoIcon}>
                  <span>🔄</span>
                </div>
                <h3 style={styles.infoTitle}>Track Progress</h3>
                <p style={styles.infoDescription}>
                  Check the status of your complaint through your student dashboard. We'll keep you updated every step of the way.
                </p>
              </div>

              <div style={styles.infoBox}>
                <div style={styles.infoIcon}>
                  <span>📊</span>
                </div>
                <h3 style={styles.infoTitle}>Feedback Matters</h3>
                <p style={styles.infoDescription}>
                  Your feedback helps us improve our services. Let us know how we handled your complaint after resolution.
                </p>
              </div>
            </div>

            <div style={styles.emergencyBox}>
              <div style={styles.emergencyIcon}>⚠️</div>
              <div>
                <p><strong>For emergencies requiring immediate assistance:</strong></p>
                <p>Call Hostel Manager at <span style={styles.emergencyContact}>(051) 123-4567</span> or Security at <span style={styles.emergencyContact}>(051) 765-4321</span></p>
              </div>
            </div>
          </section>

          <ComplaintForm />

          <section style={styles.faqSection}>
            <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
            <div style={styles.faqList}>
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>How long will it take to resolve my complaint?</h3>
                <p style={styles.faqAnswer}>
                  Resolution time depends on the nature of the complaint. Minor issues are typically resolved within 24-48 hours, while more complex problems may take 3-5 working days.
                </p>
              </div>
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>Can I modify my complaint after submission?</h3>
                <p style={styles.faqAnswer}>
                  Once submitted, you cannot directly modify your complaint. However, you can add additional information by submitting a new complaint with reference to your previous complaint number.
                </p>
              </div>
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>What should I do if my complaint is not resolved within the expected timeframe?</h3>
                <p style={styles.faqAnswer}>
                  If your complaint has not been addressed within the communicated timeframe, you can escalate it by contacting the Hostel Administrator directly or submitting a follow-up complaint indicating the previous reference number.
                </p>
              </div>
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>Can I submit anonymous complaints?</h3>
                <p style={styles.faqAnswer}>
                  While we encourage students to provide their details for follow-up purposes, you can submit anonymous complaints for certain issues like general facility maintenance or security concerns. However, room-specific issues will require your room details for resolution.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ComplaintPage;