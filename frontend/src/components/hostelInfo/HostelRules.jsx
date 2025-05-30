import React from 'react';

const HostelRules = () => {
  const styles = {
    section: {
      padding: '60px 0',
      backgroundColor: '#ffffff',
    },
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '0 20px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: '2.2rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6b7280',
      maxWidth: '700px',
      margin: '0 auto',
    },
    rulesCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    rulesIntro: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#4b5563',
      marginBottom: '30px',
    },
    highlight: {
      fontWeight: 'bold',
      color: '#1e3a8a',
    },
    rulesList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
    },
    rulesCategory: {
      marginBottom: '30px',
    },
    categoryTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '15px',
      borderBottom: '2px solid #1e3a8a',
      paddingBottom: '8px',
    },
    rule: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '10px',
    },
    ruleNumber: {
      backgroundColor: '#1e3a8a',
      color: 'white',
      fontWeight: 'bold',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '10px',
      flexShrink: 0,
      fontSize: '0.8rem',
    },
    ruleText: {
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#4b5563',
    },
    noteBox: {
      backgroundColor: '#ebf5ff',
      border: '1px solid #bfdbfe',
      borderRadius: '6px',
      padding: '15px',
      marginTop: '30px',
    },
    noteTitle: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    noteIcon: {
      marginRight: '8px',
    },
    noteText: {
      fontSize: '1rem',
      color: '#4b5563',
      lineHeight: '1.5',
    }
  };

  // Rules data
  const generalRules = [
    "Students must carry their hostel ID cards at all times and produce them on demand.",
    "Ragging in any form is strictly prohibited. Any student found involved in such activities will face immediate disciplinary action.",
    "Quiet hours are from 10:00 PM to 6:00 AM. Students are expected to maintain silence during this period.",
    "Visitors are allowed only in designated areas and during visiting hours (4:00 PM to 7:00 PM on weekends).",
    "Consumption of alcohol, drugs, and smoking is strictly prohibited in the hostel premises.",
    "Students are responsible for the safety of their belongings. The hostel administration is not liable for any loss or damage."
  ];

  const roomRules = [
    "Room changes are not permitted without prior approval from the hostel warden.",
    "Students are responsible for keeping their rooms and surroundings clean and tidy.",
    "No electrical appliances other than laptop, mobile charger, and study lamp are allowed in the rooms.",
    "Walls and furniture should not be defaced or damaged. Penalty will be charged for any damage.",
    "Food is not allowed in the rooms except in case of illness with prior permission.",
    "Lights and fans must be switched off when leaving the room."
  ];

  const messRules = [
    "Mess timings must be strictly followed. Breakfast: 7:30 AM - 9:00 AM, Lunch: 12:30 PM - 2:00 PM, Dinner: 7:30 PM - 9:00 PM.",
    "Food will be served only in the dining hall. Taking utensils outside is not permitted.",
    "Wasting food is strictly discouraged.",
    "Complaints regarding food quality should be reported to the mess committee or entered in the complaint register.",
    "Special dietary requirements should be communicated to the mess manager in advance.",
    "Maintain queue and proper decorum in the dining hall."
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.heading}>
          <h2 style={styles.title}>Hostel Rules & Regulations</h2>
          <p style={styles.subtitle}>
            Guidelines that ensure a harmonious and productive living environment for all residents
          </p>
        </div>

        <div style={styles.rulesCard}>
          <p style={styles.rulesIntro}>
            At Namal Residency, we maintain certain rules and regulations to ensure the safety, security, and comfort of all residents. 
            Your cooperation in following these guidelines is <span style={styles.highlight}>essential for creating a positive living and learning environment</span> for everyone.
          </p>

          <div style={styles.rulesList}>
            <div style={styles.rulesCategory}>
              <h3 style={styles.categoryTitle}>General Rules</h3>
              {generalRules.map((rule, index) => (
                <div key={`general-${index}`} style={styles.rule}>
                  <span style={styles.ruleNumber}>{index + 1}</span>
                  <p style={styles.ruleText}>{rule}</p>
                </div>
              ))}
            </div>

            <div style={styles.rulesCategory}>
              <h3 style={styles.categoryTitle}>Room Rules</h3>
              {roomRules.map((rule, index) => (
                <div key={`room-${index}`} style={styles.rule}>
                  <span style={styles.ruleNumber}>{index + 1}</span>
                  <p style={styles.ruleText}>{rule}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.rulesCategory}>
            <h3 style={styles.categoryTitle}>Mess Rules</h3>
            {messRules.map((rule, index) => (
              <div key={`mess-${index}`} style={styles.rule}>
                <span style={styles.ruleNumber}>{index + 1}</span>
                <p style={styles.ruleText}>{rule}</p>
              </div>
            ))}
          </div>

          <div style={styles.noteBox}>
            <h4 style={styles.noteTitle}>
              <span style={styles.noteIcon}>ℹ️</span> Important Note
            </h4>
            <p style={styles.noteText}>
              Violation of any of these rules may lead to disciplinary action, including fines, suspension, or expulsion from the hostel. 
              The hostel administration reserves the right to modify these rules as and when required. Any changes will be communicated to the residents through notice boards and email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostelRules;