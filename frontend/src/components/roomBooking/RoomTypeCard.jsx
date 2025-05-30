import React from 'react';

const RoomTypeCard = ({ type, capacity, price, image, amenities, availability }) => {
  const styles = {
    card: {
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      margin: '20px 0',
      backgroundColor: '#fff',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
    },
    image: {
      width: '100%',
      height: '300px',
      objectFit: 'cover',
    },
    content: {
      padding: '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
    },
    title: {
      margin: '0',
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#2c3e50',
    },
    price: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
      color: '#3498db',
    },
    capacity: {
      display: 'inline-block',
      backgroundColor: '#f3f4f6',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '0.9rem',
      marginBottom: '10px',
    },
    amenitiesTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      marginTop: '15px',
      marginBottom: '10px',
    },
    amenitiesList: {
      listStyleType: 'none',
      padding: '0',
      margin: '0',
    },
    amenityItem: {
      padding: '4px 0',
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.9rem',
    },
    checkIcon: {
      marginRight: '8px',
      color: '#27ae60',
    },
    availability: {
      marginTop: '15px',
      padding: '8px 0',
      borderTop: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    availabilityText: {
      color: availability > 0 ? '#27ae60' : '#e74c3c',
      fontWeight: '600',
    },
    viewButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '8px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.3s ease',
    },
    viewButtonHover: {
      backgroundColor: '#2980b9',
    }
  };

  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <div 
      style={isHovering ? {...styles.card, ...styles.cardHover} : styles.card}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={image} alt={`${type} Room`} style={styles.image} />
      <div style={styles.content}>
        <div style={styles.header}>
          <h3 style={styles.title}>{type} Room</h3>
          <span style={styles.price}>PKR {price}/month</span>
        </div>
        <span style={styles.capacity}>{capacity} bed capacity</span>
        
        <h4 style={styles.amenitiesTitle}>Amenities</h4>
        <ul style={styles.amenitiesList}>
          {amenities.map((amenity, index) => (
            <li key={index} style={styles.amenityItem}>
              <span style={styles.checkIcon}>✓</span> {amenity}
            </li>
          ))}
        </ul>
        
        <div style={styles.availability}>
          <span style={styles.availabilityText}>
            {availability > 0 
              ? `${availability} rooms available` 
              : 'No rooms available'}
          </span>
          <button 
            style={isHovering ? {...styles.viewButton, ...styles.viewButtonHover} : styles.viewButton}
            onClick={() => {}}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeCard;