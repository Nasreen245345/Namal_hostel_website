import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HostelRules from '../components/hostelInfo/HostelRules';
import FacilitiesList from '../components/hostelInfo/FacilitiesList';
import exterior from '../assets/images/hostel_exterior.jpg'
const HostelInfoPage = () => {
  const [activeTab, setActiveTab] = useState('rules');

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '10px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    title: {
      fontSize: '32px',
      color: '#2c3e50',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '18px',
      color: '#7f8c8d',
      marginBottom: '20px',
    },
    heroImage: {
      width: '100%',
      height: '600px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '30px',
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
    },
    tab: {
      padding: '12px 24px',
      margin: '0 10px',
      fontSize: '16px',
      fontWeight: '600',
      backgroundColor: '#f5f5f5',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeTab: {
      backgroundColor: '#3498db',
      color: 'white',
    },
    contentContainer: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    hostelTypeContainer: {
      marginTop: '40px',
    },
    hostelTypeTitle: {
      fontSize: '24px',
      color: '#2c3e50',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '2px solid #3498db',
    },
    infoCard: {
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    infoTitle: {
      fontSize: '20px',
      color: '#2c3e50',
      marginBottom: '10px',
    },
    infoText: {
      fontSize: '16px',
      color: '#555',
      lineHeight: '1.6',
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px',
    },
    contactInfo: {
      marginTop: '40px',
      backgroundColor: '#e8f4f8',
      padding: '20px',
      borderRadius: '8px',
    },
    contactTitle: {
      fontSize: '20px',
      color: '#2c3e50',
      marginBottom: '15px',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0',
    },
    contactLabel: {
      fontWeight: 'bold',
      marginRight: '10px',
      minWidth: '80px',
    },
    contactValue: {
      color: '#555',
    }
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Namal Hostel Information</h1>
          <p style={styles.subtitle}>Everything you need to know about our comfortable and secure accommodations</p>
        </div>
        
        <img 
          src={exterior}
          alt="Namal Hostel Exterior" 
          style={styles.heroImage}
        />
        
        <div style={styles.tabContainer}>
          <button 
            style={{...styles.tab, ...(activeTab === 'rules' ? styles.activeTab : {})}} 
            onClick={() => setActiveTab('rules')}
          >
            Hostel Rules
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'facilities' ? styles.activeTab : {})}} 
            onClick={() => setActiveTab('facilities')}
          >
            Facilities & Amenities
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'overview' ? styles.activeTab : {})}} 
            onClick={() => setActiveTab('overview')}
          >
            General Overview
          </button>
        </div>
        
        <div style={styles.contentContainer}>
          {activeTab === 'rules' && <HostelRules />}
          {activeTab === 'facilities' && <FacilitiesList />}
          {activeTab === 'overview' && (
            <div>
              <div style={styles.infoCard}>
                <h3 style={styles.infoTitle}>About Namal Hostels</h3>
                <p style={styles.infoText}>
                  Namal Hostels provide comfortable and secure accommodation for our university students.
                  Our hostels are designed to create a supportive community environment that fosters
                  academic excellence and personal growth. We offer separate hostels for boys and girls, 
                  with a range of room types to meet different preferences and budget needs.
                </p>
              </div>
              
              <div style={styles.hostelTypeContainer}>
                <h3 style={styles.hostelTypeTitle}>Boys' Hostel</h3>
                <div style={styles.detailsGrid}>
                  <div style={styles.infoCard}>
                    <h4 style={styles.infoTitle}>Location</h4>
                    <p style={styles.infoText}>
                      North Campus, 5 minutes walking distance from the academic blocks
                    </p>
                  </div>
                  <div style={styles.infoCard}>
                    <h4 style={styles.infoTitle}>Capacity</h4>
                    <p style={styles.infoText}>
                      400 students with double, fourth, and sixth bed options
                    </p>
                  </div>
                  <div style={styles.infoCard}>
                    <h4 style={styles.infoTitle}>Warden</h4>
                    <p style={styles.infoText}>
                      Mr. Ahmed Khan<br />
                      Contact: +92 300 1234567
                    </p>
                  </div>
                </div>
              </div>
              
              <div style={styles.hostelTypeContainer}>
                <h3 style={styles.hostelTypeTitle}>Girls' Hostel</h3>
                <div style={styles.detailsGrid}>
                  <div style={styles.infoCard}>
                    <h4 style={styles.infoTitle}>Location</h4>
                    <p style={styles.infoText}>
                      East Campus, secured area with dedicated shuttle service
                    </p>
                  </div>
                  <div style={styles.infoCard}>
                    <h4 style={styles.infoTitle}>Capacity</h4>
                    <p style={styles.infoText}>
                      300 students with double, fourth, and sixth bed options
                    </p>
                  </div>
                  <div style={styles.infoCard}>
                    <h4 style={styles.infoTitle}>Warden</h4>
                    <p style={styles.infoText}>
                      Ms. Ayesha Ali<br />
                      Contact: +92 300 7654321
                    </p>
                  </div>
                </div>
              </div>
              
              <div style={styles.infoCard}>
                <h3 style={styles.infoTitle}>Room Types</h3>
                <p style={styles.infoText}>
                  We offer three types of accommodations to meet different needs:
                </p>
                <ul style={{...styles.infoText, paddingLeft: '20px'}}>
                  <li><strong>Double Bed Room:</strong> Shared between two students, offering more privacy and space</li>
                  <li><strong>Fourth Bed Room:</strong> Shared between four students, balancing privacy and affordability</li>
                  <li><strong>Sixth Bed Room:</strong> Shared between six students, the most economical option</li>
                </ul>
                <p style={styles.infoText}>
                  All rooms come furnished with beds, mattresses, study tables, chairs, and wardrobes.
                </p>
              </div>
              
              <div style={styles.contactInfo}>
                <h3 style={styles.contactTitle}>Contact Information</h3>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Office:</span>
                  <span style={styles.contactValue}>Hostel Administration Building, Ground Floor</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Phone:</span>
                  <span style={styles.contactValue}>+92 459 236007-8 Ext. 138</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Email:</span>
                  <span style={styles.contactValue}>hostel@namal.edu.pk</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Hours:</span>
                  <span style={styles.contactValue}>Monday to Friday, 9:00 AM to 5:00 PM</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HostelInfoPage;