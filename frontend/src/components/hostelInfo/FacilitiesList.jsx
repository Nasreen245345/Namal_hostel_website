import React, { useState } from 'react';

const FacilitiesList = () => {
  const styles = {
    section: {
      padding: '60px 0',
      backgroundColor: '#f8f9fa',
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
    facilitiesContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    tabsContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    tab: {
      padding: '12px 24px',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '30px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: '#e5e7eb',
      color: '#4b5563',
    },
    activeTab: {
      backgroundColor: '#1e3a8a',
      color: '#ffffff',
    },
    facilityCard: {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px',
    },
    facilityHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: '#f3f4f6',
      cursor: 'pointer',
    },
    facilityTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
      display: 'flex',
      alignItems: 'center',
    },
    facilityIcon: {
      marginRight: '10px',
      fontSize: '1.4rem',
    },
    expandIcon: {
      fontSize: '1.5rem',
      transition: 'transform 0.3s ease',
    },
    expandIconRotated: {
      transform: 'rotate(180deg)',
    },
    facilityDetails: {
      padding: '0',
      maxHeight: '0',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    },
    facilityDetailsExpanded: {
      padding: '20px',
      maxHeight: '1000px', // Arbitrary large value
    },
    facilitiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    facilitiesColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    facilityDetail: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '15px',
    },
    checkIcon: {
      color: '#1e3a8a',
      marginRight: '10px',
      fontWeight: 'bold',
    },
    detailText: {
      fontSize: '1rem',
      color: '#4b5563',
      lineHeight: '1.5',
    },
    facilityImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '5px',
      marginTop: '15px',
    },
    timingTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '15px',
    },
    tableRow: {
      borderBottom: '1px solid #e5e7eb',
    },
    tableHeader: {
      padding: '10px',
      textAlign: 'left',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
      backgroundColor: '#f3f4f6',
    },
    tableCell: {
      padding: '10px',
      fontSize: '0.9rem',
      color: '#4b5563',
    }
  };

  // Define facility categories and data
  const facilityCategories = [
    { id: 'all', name: 'All Facilities' },
    { id: 'accommodation', name: 'Accommodation' },
    { id: 'dining', name: 'Dining' },
    { id: 'academic', name: 'Academic' },
    { id: 'recreational', name: 'Recreational' },
    { id: 'services', name: 'Services' }
  ];

  const facilitiesData = [
    {
      id: 1,
      title: 'Room Types & Furnishing',
      icon: '🛏️',
      category: 'accommodation',
      details: [
        'Double bed rooms with attached bathroom',
        'Four bed rooms with shared bathroom',
        'Six bed dormitory style rooms',
        'Each room equipped with bed, mattress, pillow, and bedsheet',
        'Study table and chair for each student',
        'Personal wardrobe/cupboard',
        'Bookshelves',
        'Ceiling fans in every room',
        'Adequate natural light and ventilation'
      ],
      expanded: false,
      imageSrc: '/assets/images/room-double.jpg'
    },
    {
      id: 2,
      title: 'Washrooms & Hygiene',
      icon: '🚿',
      category: 'accommodation',
      details: [
        'Attached bathrooms in double bed rooms',
        'Shared bathrooms for four and six bed rooms (1:4 ratio)',
        '24-hour hot and cold water supply',
        'Regular cleaning and maintenance',
        'Western and Asian toilet options',
        'Shower facilities',
        'Hand wash and sanitizer dispensers',
        'Proper ventilation system'
      ],
      expanded: false
    },
    {
      id: 3,
      title: 'Dining Hall & Food Services',
      icon: '🍽️',
      category: 'dining',
      details: [
        'Spacious dining hall with seating capacity of 200 students',
        'Three meals served daily (breakfast, lunch, dinner)',
        'Weekly menu with diverse food options',
        'Special diet accommodation available upon request',
        'Hygienic food preparation practices',
        'Trained catering staff',
        'Drinking water dispensers'
      ],
      expanded: false,
      timings: [
        { day: 'Monday - Friday', breakfast: '7:30 AM - 9:00 AM', lunch: '12:30 PM - 2:00 PM', dinner: '7:30 PM - 9:00 PM' },
        { day: 'Weekends & Holidays', breakfast: '8:00 AM - 9:30 AM', lunch: '1:00 PM - 2:30 PM', dinner: '7:30 PM - 9:00 PM' }
      ]
    },
    {
      id: 4,
      title: 'Study Areas',
      icon: '📚',
      category: 'academic',
      details: [
        'Dedicated study rooms on each floor',
        'Common study hall with capacity of 100 students',
        'Quiet zones for individual study',
        'Group discussion areas',
        'Proper lighting and ergonomic furniture',
        'Wi-Fi connectivity',
        '24-hour access'
      ],
      expanded: false,
      imageSrc: '/assets/images/hostel-exterior.jpg'
    },
    {
      id: 5,
      title: 'Computer Lab',
      icon: '💻',
      category: 'academic',
      details: [
        '30 workstations with high-speed internet',
        'Printing and scanning facilities',
        'Technical support available',
        'Software resources for academic use',
        'Quiet and air-conditioned environment'
      ],
      expanded: false,
      timings: [
        { day: 'Monday - Friday', time: '8:00 AM - 10:00 PM' },
        { day: 'Weekends & Holidays', time: '9:00 AM - 6:00 PM' }
      ]
    },
    {
      id: 6,
      title: 'Sports & Recreation',
      icon: '🏀',
      category: 'recreational',
      details: [
        'Indoor games: Table tennis, carrom, chess',
        'Outdoor sports: Basketball court, volleyball court, cricket pitch',
        'Gym with basic fitness equipment',
        'TV room with cable connection',
        'Recreational lounge for socializing',
        'Regular sports events and competitions'
      ],
      expanded: false,
      imageSrc: '/assets/images/hostel-exterior.jpg'
    },
    {
      id: 7,
      title: 'Laundry Services',
      icon: '👕',
      category: 'services',
      details: [
        'Washing machines available on each floor',
        'Designated drying areas',
        'Iron and ironing board available',
        'Optional paid laundry service',
        'Detergent vending machine'
      ],
      expanded: false
    },
    {
      id: 8,
      title: 'Internet Connectivity',
      icon: '📶',
      category: 'services',
      details: [
        'High-speed Wi-Fi throughout the hostel',
        'Wired internet connection in study areas',
        'IT support for connectivity issues',
        'Fair usage policy for bandwidth allocation'
      ],
      expanded: false
    },
    {
      id: 9,
      title: 'Security Services',
      icon: '🔒',
      category: 'services',
      details: [
        '24/7 security personnel',
        'CCTV surveillance in common areas',
        'Biometric entry system',
        'Visitor registration process',
        'Emergency response protocols',
        'Fire safety equipment and evacuation plan'
      ],
      expanded: false
    }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFacilities, setExpandedFacilities] = useState({});

  // Filter facilities based on active category
  const filteredFacilities = activeCategory === 'all' 
    ? facilitiesData 
    : facilitiesData.filter(facility => facility.category === activeCategory);

  // Toggle facility details expansion
  const toggleFacility = (id) => {
    setExpandedFacilities(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.heading}>
          <h2 style={styles.title}>Hostel Facilities</h2>
          <p style={styles.subtitle}>
            Explore the comprehensive facilities provided at Namal Residency to enhance your living experience
          </p>
        </div>

        <div style={styles.tabsContainer}>
          {facilityCategories.map(category => (
            <button
              key={category.id}
              style={{
                ...styles.tab,
                ...(activeCategory === category.id ? styles.activeTab : {})
              }}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div style={styles.facilitiesContainer}>
          {filteredFacilities.map(facility => (
            <div key={facility.id} style={styles.facilityCard}>
              <div 
                style={styles.facilityHeader}
                onClick={() => toggleFacility(facility.id)}
              >
                <h3 style={styles.facilityTitle}>
                  <span style={styles.facilityIcon}>{facility.icon}</span>
                  {facility.title}
                </h3>
                <span 
                  style={{
                    ...styles.expandIcon,
                    ...(expandedFacilities[facility.id] ? styles.expandIconRotated : {})
                  }}
                >
                  ▼
                </span>
              </div>
              <div 
                style={{
                  ...styles.facilityDetails,
                  ...(expandedFacilities[facility.id] ? styles.facilityDetailsExpanded : {})
                }}
              >
                <div style={styles.facilitiesGrid}>
                  <div style={styles.facilitiesColumn}>
                    {facility.details.map((detail, index) => (
                      <div key={index} style={styles.facilityDetail}>
                        <span style={styles.checkIcon}>✓</span>
                        <p style={styles.detailText}>{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {facility.imageSrc && (
                  <img 
                    src={facility.imageSrc} 
                    alt={facility.title} 
                    style={styles.facilityImage} 
                  />
                )}

                {facility.timings && (
                  <div>
                    <h4 style={{color: '#1e3a8a', marginTop: '20px', marginBottom: '10px'}}>Operating Hours</h4>
                    <table style={styles.timingTable}>
                      <thead>
                        <tr style={styles.tableRow}>
                          <th style={styles.tableHeader}>Day</th>
                          {facility.timings[0].breakfast && <th style={styles.tableHeader}>Breakfast</th>}
                          {facility.timings[0].lunch && <th style={styles.tableHeader}>Lunch</th>}
                          {facility.timings[0].dinner && <th style={styles.tableHeader}>Dinner</th>}
                          {facility.timings[0].time && <th style={styles.tableHeader}>Hours</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {facility.timings.map((timing, index) => (
                          <tr key={index} style={styles.tableRow}>
                            <td style={styles.tableCell}>{timing.day}</td>
                            {timing.breakfast && <td style={styles.tableCell}>{timing.breakfast}</td>}
                            {timing.lunch && <td style={styles.tableCell}>{timing.lunch}</td>}
                            {timing.dinner && <td style={styles.tableCell}>{timing.dinner}</td>}
                            {timing.time && <td style={styles.tableCell}>{timing.time}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesList;