import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FeeTable from '../components/feeStructure/FeeTable';

const FeeStructurePage = () => {
  const styles = {
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    mainContent: {
      flex: 1,
      padding: '2rem 0',
      background: 'linear-gradient(to bottom, #f5f7fa, #ffffff)',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
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
    contactSection: {
      background: '#f8f9fa',
      padding: '2rem',
      borderRadius: '8px',
      marginTop: '3rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    },
    contactTitle: {
      fontSize: '1.5rem',
      color: '#2c3e50',
      marginBottom: '1rem',
    },
    contactInfo: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '1rem',
    },
    contactItem: {
      flex: '1 1 300px',
      background: 'white',
      padding: '1.5rem',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    },
    contactLabel: {
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#3498db',
    },
  };

  return (
    <div style={styles.pageContainer}>
      
      <main style={styles.mainContent}>
        <div style={styles.container}>
          <header style={styles.header}>
            <h1 style={styles.title}>Fee Structure</h1>
            <div style={styles.separator}></div>
            <p style={styles.subtitle}>
              Transparent and affordable fee structure for all students staying at Namal Residency.
              We offer flexible payment options to accommodate your needs.
            </p>
          </header>

          <FeeTable />

          <section style={styles.contactSection}>
            <h2 style={styles.contactTitle}>For Fee Related Inquiries</h2>
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <p style={styles.contactLabel}>Finance Office</p>
                <p>Room 101, Admin Block</p>
                <p>Opening Hours: 9:00 AM - 4:00 PM (Monday to Friday)</p>
              </div>
              <div style={styles.contactItem}>
                <p style={styles.contactLabel}>Contact</p>
                <p>Phone: (051) 123-4567</p>
                <p>Email: finance@namal.edu.pk</p>
              </div>
              <div style={styles.contactItem}>
                <p style={styles.contactLabel}>Account Details</p>
                <p>Bank: National Bank of Pakistan</p>
                <p>Account No: 1234-5678-9012-3456</p>
                <p>Branch Code: 0123</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FeeStructurePage;