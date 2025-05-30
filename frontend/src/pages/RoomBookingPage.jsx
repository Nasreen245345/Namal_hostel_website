import React, { useState, useEffect } from 'react';
import RoomTypeCard from '../components/roomBooking/RoomTypeCard';
import BookingForm from '../components/roomBooking/BookingForm';
import room_double from '../assets/images/room-double.jpg'
const RoomBookingPage = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isHoveringBackToTop, setIsHoveringBackToTop] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
      fontSize: '2.5rem',
      color: '#2c3e50',
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#7f8c8d',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    roomsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '30px',
      marginBottom: '50px',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      color: '#2c3e50',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '2px solid #3498db',
    },
    infoBox: {
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '40px',
      border: '1px solid #e9ecef',
    },
    infoTitle: {
      fontSize: '1.3rem',
      color: '#2c3e50',
      marginBottom: '15px',
    },
    infoList: {
      listStyleType: 'disc',
      paddingLeft: '20px',
      marginBottom: '0',
    },
    infoItem: {
      margin: '8px 0',
      fontSize: '1rem',
      color: '#34495e',
      lineHeight: '1.5',
    },
    loader: {
      textAlign: 'center',
      padding: '50px 0',
      fontSize: '1.2rem',
      color: '#7f8c8d',
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    backToTopButton: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      zIndex: 100,
      transition: 'all 0.3s ease',
    },
    backToTopButtonHover: {
      backgroundColor: '#2980b9',
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    },
    upArrow: {
      border: 'solid white',
      borderWidth: '0 3px 3px 0',
      display: 'inline-block',
      padding: '5px',
      transform: 'rotate(-135deg)',
    },
    bookRoomBtn: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '5px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      display: 'block',
      margin: '30px auto',
      width: '200px',
    },
    bookRoomBtnHover: {
      backgroundColor: '#2980b9',
    },
    formSection: {
      marginTop: '50px',
      scrollMarginTop: '100px',
    },
    sectionDivider: {
      height: '2px',
      backgroundColor: '#ecf0f1',
      margin: '50px 0',
    }
  };

  // Mock room types data (in a real app, this would come from an API)
  const mockRoomTypes = [
    {
      id: 'double',
      type: 'Double',
      capacity: 2,
      price: 15000,
      image: room_double,
      amenities: [
        'Attached bathroom',
        'Study table & chair',
        'Wardrobe',
        'High-speed Wi-Fi',
        'Air conditioning'
      ],
      availability: 5
    },
    {
      id: 'fourth',
      type: 'Four Bed',
      capacity: 4,
      price: 12000,
      image: room_double,
      amenities: [
        'Shared bathroom (2 students)',
        'Study table & chair',
        'Wardrobe',
        'High-speed Wi-Fi',
        'Ceiling fan'
      ],
      availability: 8
    },
    {
      id: 'sixth',
      type: 'Six Bed',
      capacity: 6,
      price: 10000,
      image: room_double,
      amenities: [
        'Shared bathroom (3 students)',
        'Study table & chair',
        'Locker storage',
        'High-speed Wi-Fi',
        'Ceiling fan'
      ],
      availability: 12
    }
  ];

  useEffect(() => {
    // In a real app, fetch room types from API
    const fetchRoomTypes = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setRoomTypes(mockRoomTypes);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load room information. Please try again later.');
        setLoading(false);
      }
    };

    fetchRoomTypes();

    // Add scroll event listener for back to top button
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRoomSelection = (roomId) => {
    setSelectedRoom(roomId);
    setShowBookingForm(true);
    
    // Scroll to booking form
    setTimeout(() => {
      const bookingFormElement = document.getElementById('booking-form');
      if (bookingFormElement) {
        bookingFormElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSubmitBooking = (formData) => {
    // In a real app, send data to backend API
    console.log('Booking submitted:', formData);
    // Additional actions after successful submission would go here
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>
          Loading room information...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Room Booking</h1>
        <p style={styles.subtitle}>
          Namal Residency offers comfortable accommodation options for students.
          Choose from our variety of room types based on your preference and budget.
        </p>
      </div>

      <div style={styles.infoBox}>
        <h3 style={styles.infoTitle}>Important Information</h3>
        <ul style={styles.infoList}>
          <li style={styles.infoItem}>Room allocation is subject to availability and is processed on a first-come, first-served basis.</li>
          <li style={styles.infoItem}>A security deposit equal to one month's rent is required at the time of check-in.</li>
          <li style={styles.infoItem}>Students must comply with all hostel rules and regulations.</li>
          <li style={styles.infoItem}>Bookings are confirmed only after verification of student ID and payment of booking fee.</li>
        </ul>
      </div>

      <h2 style={styles.sectionTitle}>Available Room Types</h2>
      
      <div style={styles.roomsGrid}>
        {roomTypes.map(room => (
          <div key={room.id} onClick={() => handleRoomSelection(room.id)}>
            <RoomTypeCard
              type={room.type}
              capacity={room.capacity}
              price={room.price}
              image={room.image}
              amenities={room.amenities}
              availability={room.availability}
            />
          </div>
        ))}
      </div>

      {!showBookingForm && (
        <button 
          style={{
            ...styles.bookRoomBtn,
            ...(isHoveringBackToTop ? styles.bookRoomBtnHover : {})
          }}
          onMouseEnter={() => setIsHoveringBackToTop(true)}
          onMouseLeave={() => setIsHoveringBackToTop(false)}
          onClick={() => setShowBookingForm(true)}
        >
          Book a Room Now
        </button>
      )}

      {showBookingForm && (
        <div style={styles.formSection} id="booking-form">
          <div style={styles.sectionDivider}></div>
          <h2 style={styles.sectionTitle}>Book Your Room</h2>
          <BookingForm 
            selectedRoom={selectedRoom} 
            onSubmit={handleSubmitBooking} 
          />
        </div>
      )}

      {showBackToTop && (
        <button
          style={
            isHoveringBackToTop
              ? { ...styles.backToTopButton, ...styles.backToTopButtonHover }
              : styles.backToTopButton
          }
          onClick={scrollToTop}
          onMouseEnter={() => setIsHoveringBackToTop(true)}
          onMouseLeave={() => setIsHoveringBackToTop(false)}
          aria-label="Back to top"
        >
          <span style={styles.upArrow}></span>
        </button>
      )}
    </div>
  );
};

export default RoomBookingPage;