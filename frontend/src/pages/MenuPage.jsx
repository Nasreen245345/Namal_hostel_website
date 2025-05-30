import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WeeklyMenu from '../components/menu/WeeklyMenu';
import DailySpecials from '../components/menu/DailySpecials';

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState('weekly');

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    mainContent: {
      flex: 1,
      backgroundColor: '#f5f7fa',
      padding: '20px 0',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    pageHeader: {
      backgroundImage: 'linear-gradient(135deg, #3498db, #2c3e50)',
      color: 'white',
      padding: '60px 20px',
      textAlign: 'center',
      marginBottom: '30px',
    },
    heading: {
      fontSize: '36px',
      fontWeight: 'bold',
      margin: '0 0 15px 0',
    },
    subheading: {
      fontSize: '18px',
      fontWeight: 'normal',
      maxWidth: '700px',
      margin: '0 auto',
      opacity: '0.9',
    },
    tabsContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
    },
    tab: {
      padding: '12px 25px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      margin: '0 10px',
      transition: 'all 0.3s ease',
    },
    activeTab: {
      backgroundColor: '#3498db',
      color: 'white',
      boxShadow: '0 2px 8px rgba(52, 152, 219, 0.4)',
    },
    inactiveTab: {
      backgroundColor: 'white',
      color: '#2c3e50',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    menuContainer: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
      padding: '20px',
      marginBottom: '30px',
    },
    announcement: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      padding: '15px 20px',
      marginBottom: '30px',
      position: 'relative',
    },
    announcementIcon: {
      marginRight: '10px',
      color: '#3498db',
    },
    announcementText: {
      color: '#6c757d',
      margin: '0',
      fontSize: '15px',
      lineHeight: '1.5',
    },
    highlight: {
      color: '#e74c3c',
      fontWeight: 'bold',
    },
    feedbackContainer: {
      textAlign: 'center',
      margin: '40px 0',
    },
    feedbackTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '15px',
    },
    feedbackBtn: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '5px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    feedbackBtnHover: {
      backgroundColor: '#27ae60',
    }
  };

  return (
    <div style={styles.pageContainer}>


      <div style={styles.pageHeader}>
        <h1 style={styles.heading}>Hostel Dining</h1>
        <p style={styles.subheading}>
          Explore our weekly menu and daily special offerings that cater to diverse tastes and nutritional needs
        </p>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.container}>
          <div style={styles.announcement}>
            <p style={styles.announcementText}>
              <span style={styles.announcementIcon}>📢</span>
              Please note: Meal timings are - Breakfast (7:00 AM - 9:00 AM), Lunch (12:30 PM - 2:30 PM), 
              Dinner (7:30 PM - 9:30 PM). <span style={styles.highlight}>Special dietary requests must be submitted 24 hours in advance.</span>
            </p>
          </div>

          <div style={styles.tabsContainer}>
            <div 
              style={{
                ...styles.tab,
                ...(activeTab === 'weekly' ? styles.activeTab : styles.inactiveTab)
              }}
              onClick={() => setActiveTab('weekly')}
            >
              Weekly Menu
            </div>
            <div 
              style={{
                ...styles.tab,
                ...(activeTab === 'specials' ? styles.activeTab : styles.inactiveTab)
              }}
              onClick={() => setActiveTab('specials')}
            >
              Daily Specials
            </div>
          </div>

          <div style={styles.menuContainer}>
            {activeTab === 'weekly' ? <WeeklyMenu /> : <DailySpecials />}
          </div>

          <div style={styles.feedbackContainer}>
            <h3 style={styles.feedbackTitle}>We value your feedback on hostel food!</h3>
            <button 
              style={styles.feedbackBtn}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#27ae60';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#2ecc71';
              }}
            >
              Submit Food Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;