import React, { useState, useEffect } from 'react';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, found, lost
  
  // Styling
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    filterButtons: {
      display: 'flex',
      gap: '10px',
    },
    filterButton: {
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },
    activeButton: {
      backgroundColor: '#1e88e5',
      color: 'white',
    },
    inactiveButton: {
      backgroundColor: '#e0e0e0',
      color: '#333',
    },
    itemsList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    itemCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
    },
    cardHover: {
      transform: 'translateY(-5px)',
    },
    itemImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
    },
    itemContent: {
      padding: '16px',
    },
    itemTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#333',
    },
    itemDescription: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '12px',
    },
    itemMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: '#888',
    },
    statusTag: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    lostTag: {
      backgroundColor: '#ffcdd2',
      color: '#c62828',
    },
    foundTag: {
      backgroundColor: '#c8e6c9',
      color: '#2e7d32',
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 0',
      color: '#666',
    },
    loader: {
      textAlign: 'center',
      padding: '40px 0',
    }
  };

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItems([
        {
          id: 1,
          title: 'Blue Water Bottle',
          description: 'Metal blue water bottle found in the computer lab',
          location: 'Computer Lab',
          date: '2023-05-12',
          status: 'found',
          image: 'https://via.placeholder.com/300x180?text=Water+Bottle',
          reportedBy: 'Ali Hassan'
        },
        {
          id: 2,
          title: 'Calculator',
          description: 'Scientific calculator left in Room 203',
          location: 'Room 203',
          date: '2023-05-10',
          status: 'found',
          image: 'https://via.placeholder.com/300x180?text=Calculator',
          reportedBy: 'Sara Ahmed'
        },
        {
          id: 3,
          title: 'Student ID Card',
          description: 'Lost my student ID card near cafeteria',
          location: 'Cafeteria',
          date: '2023-05-14',
          status: 'lost',
          image: 'https://via.placeholder.com/300x180?text=ID+Card',
          reportedBy: 'Zain Malik'
        },
        {
          id: 4,
          title: 'Black Umbrella',
          description: 'Lost my black umbrella yesterday',
          location: 'Main Entrance',
          date: '2023-05-15',
          status: 'lost',
          image: 'https://via.placeholder.com/300x180?text=Umbrella',
          reportedBy: 'Nadia Khan'
        },
        {
          id: 5,
          title: 'Wireless Headphones',
          description: 'Found Sony wireless headphones in the library',
          location: 'Library',
          date: '2023-05-13',
          status: 'found',
          image: 'https://via.placeholder.com/300x180?text=Headphones',
          reportedBy: 'Bilal Qureshi'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter items based on status
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  // Handle hover effect
  const [hoveredItem, setHoveredItem] = useState(null);

  if (loading) {
    return (
      <div style={styles.loader}>
        <div>Loading items...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Lost & Found Items</h2>
        <div style={styles.filterButtons}>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'all' ? styles.activeButton : styles.inactiveButton)
            }}
            onClick={() => setFilter('all')}
          >
            All Items
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'lost' ? styles.activeButton : styles.inactiveButton)
            }}
            onClick={() => setFilter('lost')}
          >
            Lost Items
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(filter === 'found' ? styles.activeButton : styles.inactiveButton)
            }}
            onClick={() => setFilter('found')}
          >
            Found Items
          </button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No items found with the selected filter.</p>
        </div>
      ) : (
        <div style={styles.itemsList}>
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              style={{
                ...styles.itemCard,
                ...(hoveredItem === item.id ? styles.cardHover : {})
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img src={item.image} alt={item.title} style={styles.itemImage} />
              <div style={styles.itemContent}>
                <div style={{
                  ...styles.statusTag,
                  ...(item.status === 'lost' ? styles.lostTag : styles.foundTag)
                }}>
                  {item.status}
                </div>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemDescription}>{item.description}</p>
                <div style={styles.itemMeta}>
                  <span>Location: {item.location}</span>
                  <span>Date: {new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div style={{...styles.itemMeta, marginTop: '8px'}}>
                  <span>Reported by: {item.reportedBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemsList;