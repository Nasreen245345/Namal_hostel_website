import React from 'react';

const GalleryFilter = ({ activeCategory, setActiveCategory }) => {
  // List of available categories
  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'exterior', name: 'Exterior' },
    { id: 'rooms', name: 'Rooms' },
    { id: 'facilities', name: 'Facilities' },
    { id: 'events', name: 'Events & Activities' }
  ];

  const styles = {
    container: {
      marginBottom: '30px',
    },
    filterHeading: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
    },
    filterIcon: {
      marginRight: '10px',
      fontSize: '20px',
    },
    categoriesList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    categoryItem: {
      margin: '0',
    },
    categoryButton: {
      padding: '8px 16px',
      borderRadius: '20px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeButton: {
      backgroundColor: '#3498db',
      color: 'white',
      boxShadow: '0 2px 5px rgba(52, 152, 219, 0.4)',
    },
    inactiveButton: {
      backgroundColor: '#f1f2f6',
      color: '#2c3e50',
      '&:hover': {
        backgroundColor: '#e5e7eb',
      }
    },
    mobileFilter: {
      display: 'none',
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #dcdde1',
      fontSize: '16px',
      backgroundColor: 'white',
      color: '#2c3e50',
      marginBottom: '20px',
      '@media (max-width: 768px)': {
        display: 'block',
      }
    },
    '@media (max-width: 768px)': {
      categoriesList: {
        display: 'none',
      }
    }
  };

  const getCategoryStyle = (category) => {
    return {
      ...styles.categoryButton,
      ...(activeCategory === category ? styles.activeButton : styles.inactiveButton)
    };
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.filterHeading}>
        <span style={styles.filterIcon}>🔍</span> Filter Gallery
      </h3>
      
      {/* Mobile dropdown for small screens */}
      <select 
        style={styles.mobileFilter}
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
      >
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      
      {/* Categories for desktop */}
      <ul style={styles.categoriesList}>
        {categories.map(category => (
          <li key={category.id} style={styles.categoryItem}>
            <button
              style={getCategoryStyle(category.id)}
              onClick={() => setActiveCategory(category.id)}
              onMouseOver={(e) => {
                if (activeCategory !== category.id) {
                  e.target.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseOut={(e) => {
                if (activeCategory !== category.id) {
                  e.target.style.backgroundColor = '#f1f2f6';
                }
              }}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryFilter;