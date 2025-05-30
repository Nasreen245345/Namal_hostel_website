import React, { useState, useEffect } from 'react';

const DailySpecials = () => {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real application, you would fetch this from your API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setSpecials([
        {
          id: 1,
          day: 'Today',
          name: 'Special Chicken Biryani',
          description: 'Made with premium basmati rice and fresh spices',
          image: '/assets/images/hostel-exterior.jpg', // Using an existing image
          isVegetarian: false
        },
        {
          id: 2,
          day: 'Tomorrow',
          name: 'Vegetable Pasta',
          description: 'Fresh seasonal vegetables with creamy white sauce',
          image: '/assets/images/room-double.jpg', // Using an existing image
          isVegetarian: true
        },
        {
          id: 3,
          day: 'Weekend Special',
          name: 'Barbecue Night',
          description: 'Variety of grilled items with special sauces',
          image: '/assets/images/room-sixth.jpg', // Using an existing image
          isVegetarian: false
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const styles = {
    container: {
      padding: '30px 20px',
      maxWidth: '100%',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '25px',
      fontSize: '28px',
      fontWeight: 'bold',
    },
    specialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '25px',
      marginTop: '20px',
    },
    specialCard: {
      backgroundColor: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    specialCardHover: {
      transform: 'translateY(-5px)',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    cardContent: {
      padding: '20px',
    },
    day: {
      backgroundColor: '#3498db',
      color: 'white',
      fontSize: '14px',
      fontWeight: 'bold',
      padding: '5px 10px',
      borderRadius: '4px',
      display: 'inline-block',
      marginBottom: '10px',
    },
    dishName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '10px',
    },
    description: {
      color: '#7f8c8d',
      marginBottom: '15px',
      lineHeight: '1.5',
    },
    badge: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    vegBadge: {
      backgroundColor: '#2ecc71',
      color: 'white',
    },
    nonVegBadge: {
      backgroundColor: '#e74c3c',
      color: 'white',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      width: '100%',
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '40px',
      height: '40px',
      border: '5px solid rgba(0, 0, 0, 0.1)',
      borderLeftColor: '#3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    '@keyframes spin': {
      to: { transform: 'rotate(360deg)' }
    },
    info: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '16px',
      color: '#7f8c8d',
      fontStyle: 'italic',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Daily Specials</h2>
      <p style={styles.info}>
        Each day, our hostel kitchen prepares special dishes in addition to the regular menu
      </p>
      
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
        </div>
      ) : (
        <div style={styles.specialsGrid}>
          {specials.map((special) => (
            <div 
              key={special.id} 
              style={styles.specialCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img 
                src={special.image} 
                alt={special.name} 
                style={styles.cardImage} 
              />
              <div style={styles.cardContent}>
                <div style={styles.day}>{special.day}</div>
                <h3 style={styles.dishName}>{special.name}</h3>
                <p style={styles.description}>{special.description}</p>
                <div style={{
                  ...styles.badge, 
                  ...(special.isVegetarian ? styles.vegBadge : styles.nonVegBadge)
                }}>
                  {special.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailySpecials;
