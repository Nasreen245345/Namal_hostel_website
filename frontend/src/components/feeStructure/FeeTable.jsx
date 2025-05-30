import React, { useState } from 'react';

const FeeTable = () => {
  const [activeTab, setActiveTab] = useState('semester');
  
  const feeData = {
    semester: [
      { type: 'Double Bed Room', amount: 30000, duration: 'Per Semester' },
      { type: 'Fourth Bed Room', amount: 25000, duration: 'Per Semester' },
      { type: 'Sixth Bed Room', amount: 20000, duration: 'Per Semester' },
      { type: 'Security Deposit', amount: 10000, duration: 'One-time (Refundable)' },
      { type: 'Registration Fee', amount: 5000, duration: 'One-time (Non-Refundable)' }
    ],
    monthly: [
      { type: 'Double Bed Room', amount: 8000, duration: 'Per Month' },
      { type: 'Fourth Bed Room', amount: 6500, duration: 'Per Month' },
      { type: 'Sixth Bed Room', amount: 5000, duration: 'Per Month' },
      { type: 'Security Deposit', amount: 10000, duration: 'One-time (Refundable)' },
      { type: 'Registration Fee', amount: 5000, duration: 'One-time (Non-Refundable)' }
    ]
  };

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#2c3e50',
    },
    tabsContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
    },
    tab: {
      padding: '0.75rem 2rem',
      marginRight: '1rem',
      border: 'none',
      borderRadius: '5px',
      background: '#f1f1f1',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    activeTab: {
      background: '#3498db',
      color: 'white',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    tableHeader: {
      background: '#3498db',
      color: 'white',
      textAlign: 'left',
      padding: '1rem',
    },
    tableRow: {
      borderBottom: '1px solid #e0e0e0',
      transition: 'background 0.3s',
    },
    tableRowEven: {
      background: '#f9f9f9',
    },
    tableRowHover: {
      background: '#f1f8ff',
    },
    tableCell: {
      padding: '1rem',
    },
    amountCell: {
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    alert: {
      background: '#f8d7da',
      color: '#721c24',
      padding: '1rem',
      borderRadius: '5px',
      marginTop: '2rem',
      fontWeight: '500',
    },
    note: {
      marginTop: '2rem',
      padding: '1rem',
      background: '#e8f4f8',
      borderLeft: '4px solid #3498db',
      borderRadius: '5px',
    },
    bold: {
      fontWeight: 'bold',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Namal Hostel Fee Structure</h2>
        <p>Academic Year 2024-2025</p>
      </div>

      <div style={styles.tabsContainer}>
        <button 
          style={{...styles.tab, ...(activeTab === 'semester' ? styles.activeTab : {})}} 
          onClick={() => setActiveTab('semester')}
        >
          Semester Plan
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === 'monthly' ? styles.activeTab : {})}} 
          onClick={() => setActiveTab('monthly')}
        >
          Monthly Plan
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Fee Type</th>
            <th style={styles.tableHeader}>Amount (PKR)</th>
            <th style={styles.tableHeader}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {feeData[activeTab].map((fee, index) => (
            <tr 
              key={index} 
              style={{
                ...styles.tableRow, 
                ...(index % 2 === 0 ? styles.tableRowEven : {})
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#f1f8ff'}
              onMouseOut={(e) => e.currentTarget.style.background = index % 2 === 0 ? '#f9f9f9' : 'white'}
            >
              <td style={styles.tableCell}>{fee.type}</td>
              <td style={{...styles.tableCell, ...styles.amountCell}}>{fee.amount.toLocaleString()}</td>
              <td style={styles.tableCell}>{fee.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.note}>
        <p><span style={styles.bold}>Note:</span> All hostel fees must be paid before the start of each semester/month. Late payment will incur a surcharge of 5% per week.</p>
        <p><span style={styles.bold}>Payment Methods:</span> Bank deposit, online transfer, or at the hostel finance office.</p>
      </div>

      <div style={styles.alert}>
        <p>⚠️ Fee structure is subject to change with prior notice at the beginning of each academic year.</p>
      </div>
    </div>
  );
};

export default FeeTable;