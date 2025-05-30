import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import FacilitiesSection from '../components/home/FacilitiesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);

  // Mock announcements data - in a real app, this would come from your API
  const mockAnnouncements = [
    {
      id: 1,
      title: "Summer Break Room Vacating Notice",
      content: "All students must vacate their rooms by June 15th for summer maintenance.",
      date: "2025-05-10",
      priority: "high"
    },
    {
      id: 2,
      title: "New Gym Equipment Arrival",
      content: "The hostel gym has been upgraded with new equipment. Open for use from May 20th.",
      date: "2025-05-12",
      priority: "medium"
    },
    {
      id: 3,
      title: "Cafeteria Schedule Change",
      content: "The cafeteria will have adjusted hours during exam week. Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 6-8PM.",
      date: "2025-05-15",
      priority: "medium"
    }
  ];

  // Simulating an API fetch for announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/announcements');
        // const data = await response.json();
        
        // Simulate API delay
        setTimeout(() => {
          setAnnouncements(mockAnnouncements);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch announcements');
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Quick facts about the hostel
  const quickFacts = [
    { 
      number: "2", 
      label: "Hostels", 
      description: "Boys & Girls" 
    },
    { 
      number: "500+", 
      label: "Beds", 
      description: "Comfortable living" 
    },
    { 
      number: "24/7", 
      label: "Security", 
      description: "Safe environment" 
    },
    { 
      number: "100%", 
      label: "Wi-Fi", 
      description: "High-speed internet" 
    }
  ];

  return (
    <div style={styles.pageContainer}>
      
      {/* Hero Section */}
      <Hero />
      
      {/* Announcements Section */}
      <div style={styles.announcementsSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Latest Announcements</h2>
          <div style={styles.announcementsContainer}>
            {isLoading ? (
              <div style={styles.loaderContainer}>
                <Loader size="medium" color="#3498db" />
              </div>
            ) : error ? (
              <div style={styles.errorMessage}>{error}</div>
            ) : announcements.length > 0 ? (
              announcements.map(announcement => (
                <div 
                  key={announcement.id} 
                  style={{
                    ...styles.announcementCard,
                    borderLeft: announcement.priority === 'high' 
                      ? '4px solid #e74c3c' 
                      : announcement.priority === 'medium'
                        ? '4px solid #f39c12'
                        : '4px solid #3498db'
                  }}
                >
                  <h3 style={styles.announcementTitle}>{announcement.title}</h3>
                  <p style={styles.announcementContent}>{announcement.content}</p>
                  <p style={styles.announcementDate}>Posted: {new Date(announcement.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p style={styles.noAnnouncements}>No current announcements</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Quick Facts Section */}
      <div style={styles.quickFactsSection}>
        <div style={styles.container}>
          <div style={styles.quickFactsGrid}>
            {quickFacts.map((fact, index) => (
              <div key={index} style={styles.factCard}>
                <h2 style={styles.factNumber}>{fact.number}</h2>
                <h3 style={styles.factLabel}>{fact.label}</h3>
                <p style={styles.factDescription}>{fact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <AboutSection />
      
      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <div style={styles.container}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready to Reserve Your Room?</h2>
            <p style={styles.ctaText}>
              Secure your spot in Namal University's premium student accommodation. 
              Our rooms are filling fast for the upcoming semester.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/room-booking" style={styles.ctaButtonLink}>
                <Button style={styles.ctaPrimaryButton}>Book Now</Button>
              </Link>
              <Link to="/hostel-info" style={styles.ctaButtonLink}>
                <Button style={styles.ctaSecondaryButton}>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Facilities Section */}
      <FacilitiesSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Virtual Tour Section */}
      <div style={styles.virtualTourSection}>
        <div style={styles.container}>
          <div style={styles.virtualTourContent}>
            <div style={styles.virtualTourText}>
              <h2 style={styles.virtualTourTitle}>Take a Virtual Tour</h2>
              <p style={styles.virtualTourDescription}>
                Can't visit in person? Explore our hostel facilities through our interactive 
                virtual tour. Get a feel for our rooms, common areas, and amenities before you apply.
              </p>
              <Link to="/gallery" style={styles.tourButtonLink}>
                <Button style={styles.tourButton}>Start Tour</Button>
              </Link>
            </div>
            <div style={styles.virtualTourImageContainer}>
              <div style={styles.virtualTourImage}>
                {/* This would be replaced with an actual image or tour preview */}
                <div style={styles.tourPlaceholder}>
                  <div style={styles.playButton}>▶</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Quick Links */}
      <div style={styles.faqSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div style={styles.faqGrid}>
            <Link to="/hostel-info" style={styles.faqCard}>
              <h3 style={styles.faqCardTitle}>Hostel Rules</h3>
              <p style={styles.faqCardText}>Learn about our community guidelines and policies.</p>
            </Link>
            <Link to="/fee-structure" style={styles.faqCard}>
              <h3 style={styles.faqCardTitle}>Fee Structure</h3>
              <p style={styles.faqCardText}>Information about room rates and payment schedules.</p>
            </Link>
            <Link to="/menu" style={styles.faqCard}>
              <h3 style={styles.faqCardTitle}>Dining Options</h3>
              <p style={styles.faqCardText}>Explore our cafeteria menu and meal plans.</p>
            </Link>
            <Link to="/complaint" style={styles.faqCard}>
              <h3 style={styles.faqCardTitle}>Support Services</h3>
              <p style={styles.faqCardText}>How to report issues and access assistance.</p>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

// Internal CSS styling object
const styles = {
pageContainer: {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
 
},
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    margin: '0 0 40px 0',
  },
  
  // Announcements Section
  announcementsSection: {
    padding: '60px 0',
    backgroundColor: '#f8f9fa',
  },
  announcementsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  announcementCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px 25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease',
  },
  announcementTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: '0 0 10px 0',
  },
  announcementContent: {
    fontSize: '15px',
    color: '#5d6778',
    margin: '0 0 15px 0',
  },
  announcementDate: {
    fontSize: '13px',
    color: '#95a5a6',
    margin: '0',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0',
  },
  errorMessage: {
    color: '#e74c3c',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#ffecee',
    borderRadius: '8px',
  },
  noAnnouncements: {
    textAlign: 'center',
    color: '#7f8c8d',
    padding: '20px',
  },
  
  // Quick Facts Section
  quickFactsSection: {
    padding: '70px 0',
    backgroundColor: '#ffffff',
  },
  quickFactsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
  },
  factCard: {
    textAlign: 'center',
    padding: '30px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
  },
  factNumber: {
    fontSize: '42px',
    fontWeight: '700',
    color: '#3498db',
    margin: '0 0 5px 0',
  },
  factLabel: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: '0 0 8px 0',
  },
  factDescription: {
    fontSize: '14px',
    color: '#7f8c8d',
    margin: '0',
  },
  
  // CTA Section
  ctaSection: {
    padding: '80px 0',
    backgroundColor: '#3498db',
    backgroundImage: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
  },
  ctaContent: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 20px 0',
  },
  ctaText: {
    fontSize: '18px',
    color: '#ffffff',
    opacity: '0.9',
    margin: '0 0 30px 0',
  },
  ctaButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaButtonLink: {
    textDecoration: 'none',
  },
  ctaPrimaryButton: {
    padding: '14px 30px',
    backgroundColor: '#ffffff',
    color: '#3498db',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  ctaSecondaryButton: {
    padding: '14px 30px',
    backgroundColor: 'transparent',
    color: '#ffffff',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    border: '2px solid #ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  
  // Virtual Tour Section
  virtualTourSection: {
    padding: '80px 0',
    backgroundColor: '#f8f9fa',
  },
  virtualTourContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '40px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  virtualTourText: {
    flex: '1',
  },
  virtualTourTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0 0 20px 0',
  },
  virtualTourDescription: {
    fontSize: '16px',
    color: '#5d6778',
    margin: '0 0 30px 0',
  },
  tourButtonLink: {
    textDecoration: 'none',
  },
  tourButton: {
    padding: '12px 25px',
    backgroundColor: '#3498db',
    color: '#ffffff',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  virtualTourImageContainer: {
    flex: '1',
  },
  virtualTourImage: {
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  tourPlaceholder: {
    backgroundColor: '#2c3e50',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  playButton: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#3498db',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  
  // FAQ Section
  faqSection: {
    padding: '70px 0',
    backgroundColor: '#ffffff',
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  faqCard: {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
  },
  faqCardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: '0 0 10px 0',
  },
  faqCardText: {
    fontSize: '14px',
    color: '#5d6778',
    margin: '0',
  },
};

export default HomePage;