import React, { useState, useEffect } from 'react';
import  useAuth  from '../../hooks/useAuth';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Styles
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    heading: {
      fontSize: '1.5rem',
      color: '#333',
      marginBottom: '5px'
    },
    list: {
      listStyle: 'none',
      padding: '0'
    },
    notificationItem: (read) => ({
      backgroundColor: read ? 'white' : '#f0f7ff',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '6px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderLeft: read ? '4px solid #ddd' : '4px solid #4a90e2',
      position: 'relative',
      transition: 'all 0.2s ease'
    }),
    title: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    content: {
      fontSize: '14px',
      marginBottom: '10px',
      lineHeight: '1.5'
    },
    meta: {
      fontSize: '12px',
      color: '#666',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    button: {
      backgroundColor: 'transparent',
      color: '#4a90e2',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    clearAllButton: {
      backgroundColor: '#f5f5f5',
      color: '#666',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    badge: {
      backgroundColor: '#4a90e2',
      color: 'white',
      borderRadius: '20px',
      padding: '2px 8px',
      fontSize: '12px',
      marginLeft: '10px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '30px',
      color: '#666'
    },
    categoryBadge: (category) => ({
      display: 'inline-block',
      padding: '3px 8px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 'bold',
      marginRight: '5px',
      backgroundColor: 
        category === 'Maintenance' ? '#ff9800' :
        category === 'Booking' ? '#4caf50' :
        category === 'Fee' ? '#f44336' :
        category === 'Event' ? '#9c27b0' :
        '#2196f3',
      color: 'white'
    })
  };

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const mockNotifications = [
        {
          id: 1,
          title: 'Room Maintenance Scheduled',
          content: 'Maintenance work will be conducted in your block on May 20th from 10 AM to 2 PM. Please ensure your valuables are secured.',
          date: '2025-05-17',
          time: '09:15 AM',
          read: false,
          category: 'Maintenance'
        },
        {
          id: 2,
          title: 'Booking Confirmed',
          content: 'Your booking for Room 302 (Double Bed) has been confirmed for the next semester.',
          date: '2025-05-15',
          time: '02:30 PM',
          read: true,
          category: 'Booking'
        },
        {
          id: 3,
          title: 'Fee Payment Reminder',
          content: 'This is a reminder that your hostel fee payment is due by May 25th. Please ensure timely payment to avoid late fees.',
          date: '2025-05-14',
          time: '10:00 AM',
          read: false,
          category: 'Fee'
        },
        {
          id: 4,
          title: 'Hostel Cultural Night',
          content: 'Join us for the annual Cultural Night celebration on May 22nd at 7 PM in the Main Hall. Don\'t miss the fun!',
          date: '2025-05-12',
          time: '04:45 PM',
          read: true,
          category: 'Event'
        },
        {
          id: 5,
          title: 'Complaint Response',
          content: 'Your complaint regarding the WiFi issue has been addressed. Technical team has fixed the router in your block.',
          date: '2025-05-10',
          time: '11:20 AM',
          read: true,
          category: 'Complaint'
        }
      ];
      
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Mark as read functionality
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Clear read notifications
  const clearReadNotifications = () => {
    setNotifications(notifications.filter(notification => !notification.read));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>
          Notifications
          {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
        </h2>
        <div>
          {notifications.some(n => !n.read) && (
            <button style={styles.clearAllButton} onClick={markAllAsRead}>
              Mark all as read
            </button>
          )}
          {notifications.some(n => n.read) && (
            <button 
              style={{...styles.clearAllButton, marginLeft: '10px'}} 
              onClick={clearReadNotifications}
            >
              Clear read
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <div style={styles.emptyState}>
          <p>You have no notifications at this time.</p>
        </div>
      ) : (
        <ul style={styles.list}>
          {notifications.map(notification => (
            <li key={notification.id} style={styles.notificationItem(notification.read)}>
              <div style={styles.title}>
                <span style={styles.categoryBadge(notification.category)}>
                  {notification.category}
                </span>
                {notification.title}
              </div>
              <p style={styles.content}>{notification.content}</p>
              <div style={styles.meta}>
                <span>{notification.date} at {notification.time}</span>
                {!notification.read && (
                  <button 
                    style={styles.button} 
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;