import React from 'react';

const FacilitiesSection = () => {
  const styles = {
    section: {
      padding: '80px 0',
      backgroundColor: '#ffffff',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '60px',
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
    facilitiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
    },
    facilityCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    facilityImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    facilityContent: {
      padding: '20px',
    },
    facilityTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '10px',
    },
    facilityDescription: {
      fontSize: '1rem',
      color: '#4b5563',
      lineHeight: '1.6',
    },
    ctaContainer: {
      marginTop: '60px',
      textAlign: 'center',
    },
    ctaButton: {
      backgroundColor: '#1e3a8a',
      color: 'white',
      padding: '12px 30px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    ctaButtonHover: {
      backgroundColor: '#1e4799',
    }
  };

  // Facilities data
  const facilities = [
    {
      id: 1,
      title: "Comfortable Rooms",
      image: "/assets/images/room-double.jpg",
      description: "We offer various room options including double, fourth, and sixth bed arrangements, all equipped with comfortable beds, study tables, and adequate storage."
    },
    {
      id: 2,
      title: "Modern Washrooms",
      image: "/assets/images/hostel-exterior.jpg",
      description: "Clean and hygienic washrooms with 24/7 hot and cold water supply are available on each floor of the hostel."
    },
    {
      id: 3,
      title: "Dining Facilities",
      image: "/assets/images/hostel-exterior.jpg",
      description: "Our dining halls serve nutritious and delicious meals three times a day, with special considerations for dietary restrictions."
    },
    {
      id: 4,
      title: "High-Speed Internet",
      image: "/assets/images/hostel-exterior.jpg",
      description: "Entire hostel is equipped with high-speed WiFi to support your academic and entertainment needs."
    },
    {
      id: 5,
      title: "Study Areas",
      image: "/assets/images/hostel-exterior.jpg",
      description: "Dedicated quiet study areas are available in each block to provide a conducive environment for academic work."
    },
    {
      id: 6,
      title: "Recreational Spaces",
      image: "/assets/images/hostel-exterior.jpg",
      description: "Indoor and outdoor games, TV rooms, and common areas are available for relaxation and socializing."
    }
  ];

  // Implement mouse hover effect manually
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  };

  const handleButtonHover = (e, isHovering) => {
    e.currentTarget.style.backgroundColor = isHovering ? '#1e4799' : '#1e3a8a';
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.heading}>
          <h2 style={styles.title}>Our Facilities</h2>
          <p style={styles.subtitle}>
            Discover the amenities that make Namal Residency the perfect place for your university stay
          </p>
        </div>

        <div style={styles.facilitiesGrid}>
          {facilities.map((facility) => (
            <div 
              key={facility.id} 
              style={styles.facilityCard}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => window.location.href = '/hostel-info'}
            >
              <img 
                src={facility.image} 
                alt={facility.title} 
                style={styles.facilityImage} 
              />
              <div style={styles.facilityContent}>
                <h3 style={styles.facilityTitle}>{facility.title}</h3>
                <p style={styles.facilityDescription}>{facility.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.ctaContainer}>
          <button 
            style={styles.ctaButton}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            onClick={() => window.location.href = '/hostel-info'}
          >
            View All Facilities
          </button>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;