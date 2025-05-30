import React, { useState } from 'react';
import ReportItemForm from '../components/lostFound/ReportItemForm.jsx';
import ItemsList from '../components/lostFound/ItemsList.jsx';

const LostFoundPage = () => {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'report'
  
  // Styling
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      maxWidth: '700px',
      margin: '0 auto',
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
    },
    tab: {
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      borderBottom: '3px solid transparent',
      transition: 'all 0.3s ease',
    },
    activeTab: {
      borderBottom: '3px solid #1e88e5',
      color: '#1e88e5',
    },
    inactiveTab: {
      color: '#666',
    },
    content: {
      marginTop: '20px',
    },
    infoCard: {
      backgroundColor: '#e3f2fd',
      borderRadius: '6px',
      padding: '15px 20px',
      marginBottom: '30px',
    },
    infoHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
    },
    infoTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1565c0',
    },
    infoIcon: {
      color: '#1565c0',
      fontSize: '24px',
    },
    infoText: {
      fontSize: '14px',
      color: '#333',
      lineHeight: '1.5',
    },
    stepsList: {
      marginTop: '10px',
      paddingLeft: '20px',
    },
    step: {
      marginBottom: '5px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Lost & Found</h1>
        <p style={styles.subtitle}>
          Lost something or found an item? Our Lost & Found system helps you report and track lost items at Namal Hostel.
        </p>
      </div>

      <div style={styles.infoCard}>
        <div style={styles.infoHeader}>
          <span style={styles.infoIcon}>ℹ️</span>
          <h3 style={styles.infoTitle}>How It Works</h3>
        </div>
        <p style={styles.infoText}>
          Our Lost & Found system helps reunite students with their lost belongings. Here's how you can use this service:
        </p>
        <ul style={styles.stepsList}>
          <li style={styles.step}>
            <strong>Browse the List:</strong> Check if your lost item has already been found and reported.
          </li>
          <li style={styles.step}>
            <strong>Report Lost Items:</strong> If you've lost something, report it so others can return it if found.
          </li>
          <li style={styles.step}>
            <strong>Report Found Items:</strong> If you've found something, report it so the owner can claim it.
          </li>
          <li style={styles.step}>
            <strong>Claim Process:</strong> Items can be claimed at the hostel administration office with proper identification.
          </li>
        </ul>
      </div>

      <div style={styles.tabs}>
        <div 
          style={{
            ...styles.tab,
            ...(activeTab === 'list' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveTab('list')}
        >
          Browse Items
        </div>
        <div 
          style={{
            ...styles.tab,
            ...(activeTab === 'report' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveTab('report')}
        >
          Report an Item
        </div>
      </div>

      <div style={styles.content}>
        {activeTab === 'list' ? (
          <ItemsList />
        ) : (
          <ReportItemForm onSuccess={() => setActiveTab('list')} />
        )}
      </div>
    </div>
  );
};

export default LostFoundPage;