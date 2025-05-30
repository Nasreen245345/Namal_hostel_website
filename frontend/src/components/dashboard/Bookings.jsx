import React, { useState, useEffect } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current'); // 'current', 'upcoming', 'past'

  // Mock data - in a real application, you would fetch this from your API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const mockBookings = [
        {
          id: 'BK-2024-001',
          roomType: 'Double Bed',
          roomNumber: 'A-201',
          startDate: '15 Feb 2024',
          endDate: '15 Jun 2024',
          status: 'current',
          amount: '45,000 PKR',
          paymentStatus: 'Paid',
          applicationDate: '20 Jan 2024'
        },
        {
          id: 'BK-2024-002',  
          roomType: 'Fourth Bed',
          roomNumber: 'B-105',
          startDate: '20 Jun 2024',
          endDate: '20 Sep 2024',
          status: 'upcoming',
          amount: '30,000 PKR',
          paymentStatus: 'Pending',
          applicationDate: '15 Apr 2024'
        },
        {
          id: 'BK-2023-005',
          roomType: 'Double Bed',
          roomNumber: 'A-109',
          startDate: '15 Sep 2023',
          endDate: '15 Feb 2024',
          status: 'past',
          amount: '45,000 PKR',
          paymentStatus: 'Paid',
          applicationDate: '20 Aug 2023'
        },
        {
          id: 'BK-2023-003',
          roomType: 'Sixth Bed',
          roomNumber: 'C-210',
          startDate: '15 Jun 2023',
          endDate: '15 Sep 2023',
          status: 'past',
          amount: '25,000 PKR', 
          paymentStatus: 'Paid',
          applicationDate: '01 May 2023'
        }
      ];
      
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBookings = bookings.filter(booking => booking.status === activeTab);

  const styles = {
    container: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '25px',
      marginBottom: '30px',
    },
    heading: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
    },
    headingIcon: {
      marginRight: '10px',
    },
    tabs: {
      display: 'flex',
      borderBottom: '1px solid #ecf0f1',
      marginBottom: '20px',
    },
    tab: {
      padding: '10px 20px',
      cursor: 'pointer',
      borderBottom: '3px solid transparent',
      fontWeight: '500',
      color: '#7f8c8d',
      transition: 'all 0.3s ease',
    },
    activeTab: {
      borderBottom: '3px solid #3498db',
      color: '#3498db',
      fontWeight: 'bold',
    },
    bookingList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    bookingCard: {
      border: '1px solid #ecf0f1',
      borderRadius: '8px',
      padding: '20px',
      transition: 'all 0.3s ease',
    },
    bookingHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      flexWrap: 'wrap',
      gap: '10px',
    },
    bookingId: {
      fontWeight: 'bold',
      color: '#2c3e50',
      fontSize: '16px',
    },
    bookingStatus: {
      padding: '5px 10px',
      borderRadius: '15px',
      fontSize: '12px',
      fontWeight: '500',
    },
    currentStatus: {
      backgroundColor: '#e8f4fc',
      color: '#3498db',
    },
    upcomingStatus: {
      backgroundColor: '#eafaf1',
      color: '#27ae60',
    },
    pastStatus: {
      backgroundColor: '#f8f9fa',
      color: '#95a5a6',
    },
    bookingDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
    },
    detailItem: {
      marginBottom: '10px',
    },
    detailLabel: {
      fontSize: '13px',
      color: '#7f8c8d',
      marginBottom: '5px',
    },
    detailValue: {
      fontSize: '15px',
      color: '#2c3e50',
      fontWeight: '500',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '15px',
      flexWrap: 'wrap',
    },
    button: {
      padding: '8px 16px',
      borderRadius: '5px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    primaryButton: {
      backgroundColor: '#3498db',
      color: 'white',
    },
    secondaryButton: {
      backgroundColor: '#f1f2f6',
      color: '#2c3e50',
    },
    dangerButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 0',
    },
    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '5px solid rgba(0, 0, 0, 0.1)',
      borderLeftColor: '#3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 0',
      color: '#7f8c8d',
    },
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '15px',
      color: '#bdc3c7',
    },
    emptyText: {
      fontSize: '16px',
      marginBottom: '20px',
    },
    emptyButton: {
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: '#3498db',
      color: 'white',
      borderRadius: '5px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }
  };

  // Function to get status styling
  const getStatusStyle = (status) => {
    switch(status) {
      case 'current':
        return styles.currentStatus;
      case 'upcoming':
        return styles.upcomingStatus;
      case 'past':
        return styles.pastStatus;
      default:
        return {};
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        <span style={styles.headingIcon}>🏠</span> Room Bookings
      </h2>
      
      <div style={styles.tabs}>
        <div 
          style={{
            ...styles.tab,
            ...(activeTab === 'current' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('current')}
        >
          Current
        </div>
        <div 
          style={{
            ...styles.tab,
            ...(activeTab === 'upcoming' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </div>
        <div 
          style={{
            ...styles.tab,
            ...(activeTab === 'past' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('past')}
        >
          Past
        </div>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📝</div>
          <p style={styles.emptyText}>No {activeTab} bookings found.</p>
          {activeTab !== 'current' && activeTab !== 'upcoming' && (
            <div 
              style={styles.emptyButton}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#2980b9';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#3498db';
              }}
            >
              Book a Room
            </div>
          )}
        </div>
      ) : (
        <div style={styles.bookingList}>
          {filteredBookings.map((booking) => (
            <div 
              key={booking.id} 
              style={styles.bookingCard}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#bdc3c7';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#ecf0f1';
              }}
            >
              <div style={styles.bookingHeader}>
                <div style={styles.bookingId}>Booking ID: {booking.id}</div>
                <div style={{
                  ...styles.bookingStatus,
                  ...getStatusStyle(booking.status)
                }}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
              </div>
              
              <div style={styles.bookingDetails}>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Room Type</div>
                  <div style={styles.detailValue}>{booking.roomType}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Room Number</div>
                  <div style={styles.detailValue}>{booking.roomNumber}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Duration</div>
                  <div style={styles.detailValue}>{booking.startDate} - {booking.endDate}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Fee</div>
                  <div style={styles.detailValue}>{booking.amount}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Payment Status</div>
                  <div style={styles.detailValue}>
                    {booking.paymentStatus === 'Paid' ? 
                      <span style={{color: '#27ae60'}}>{booking.paymentStatus}</span> : 
                      <span style={{color: '#e67e22'}}>{booking.paymentStatus}</span>
                    }
                  </div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Application Date</div>
                  <div style={styles.detailValue}>{booking.applicationDate}</div>
                </div>
              </div>
              
              <div style={styles.actionButtons}>
                {booking.status === 'current' && (
                  <button 
                    style={{...styles.button, ...styles.secondaryButton}}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#dcdde1';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#f1f2f6';
                    }}
                  >
                    View Receipt
                  </button>
                )}
                
                {booking.status === 'upcoming' && booking.paymentStatus === 'Pending' && (
                  <button 
                    style={{...styles.button, ...styles.primaryButton}}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#2980b9';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#3498db';
                    }}
                  >
                    Pay Now
                  </button>
                )}
                
                {booking.status === 'upcoming' && (
                  <button 
                    style={{...styles.button, ...styles.dangerButton}}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#c0392b';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#e74c3c';
                    }}
                  >
                    Cancel Booking
                  </button>
                )}
                
                {booking.status === 'past' && (
                  <button 
                    style={{...styles.button, ...styles.secondaryButton}}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#dcdde1';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#f1f2f6';
                    }}
                  >
                    Download Receipt
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;