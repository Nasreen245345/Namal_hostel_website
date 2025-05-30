import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import dashboardService from '../../services/dashboardService';

const StudentProfile = () => {
  const { user, token } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    user: null,
    bookings: [],
    complaints: [],
    notifications: []
  });

  // Form data for editing
  const [formData, setFormData] = useState({});

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await dashboardService.getDashboardOverview();
      
      if (response.success) {
        setDashboardData(response.data);
        // Initialize form data with user data
        setFormData({
          name: response.data.user.name || '',
          email: response.data.user.email || '',
          phone: response.data.user.phone || '',
          address: response.data.user.address || '',
          emergencyContact: response.data.user.emergencyContact || '',
          bloodGroup: response.data.user.bloodGroup || '',
        });
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.response?.data?.error || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real application, you would send this data to your API
      // For now, we'll just update the local state
      setDashboardData(prev => ({
        ...prev,
        user: {
          ...prev.user,
          ...formData
        }
      }));
      setIsEditing(false);
      // TODO: Implement API call to update user profile
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return '#2ecc71';
      case 'pending': return '#f39c12';
      case 'resolved': return '#2ecc71';
      case 'in-progress': return '#3498db';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
      fontSize: '18px',
      color: '#7f8c8d',
    },
    errorContainer: {
      backgroundColor: '#fee',
      border: '1px solid #fcc',
      borderRadius: '8px',
      padding: '15px',
      margin: '20px 0',
      color: '#c0392b',
      textAlign: 'center',
    },
    profileContainer: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '25px',
      marginBottom: '30px',
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      flexWrap: 'wrap',
    },
    avatarContainer: {
      marginRight: '25px',
      position: 'relative',
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: '#3498db',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      fontWeight: 'bold',
      border: '4px solid #2980b9',
    },
    studentInfo: {
      flex: '1',
    },
    studentName: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2c3e50',
      margin: '0 0 5px 0',
    },
    regNumber: {
      fontSize: '16px',
      color: '#7f8c8d',
      margin: '0 0 10px 0',
    },
    badgeContainer: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
    },
    badge: {
      display: 'inline-block',
      padding: '5px 12px',
      borderRadius: '15px',
      fontSize: '13px',
      fontWeight: '500',
      backgroundColor: '#e8f4fc',
      color: '#3498db',
    },
    actionButtons: {
      marginLeft: 'auto',
      display: 'flex',
      gap: '10px',
    },
    button: {
      padding: '8px 16px',
      borderRadius: '5px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    editButton: {
      backgroundColor: '#3498db',
      color: 'white',
    },
    saveButton: {
      backgroundColor: '#2ecc71',
      color: 'white',
    },
    cancelButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
    },
    refreshButton: {
      backgroundColor: '#9b59b6',
      color: 'white',
    },
    dashboardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px',
    },
    sectionContainer: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '20px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '15px',
      paddingBottom: '10px',
      borderBottom: '1px solid #ecf0f1',
      display: 'flex',
      alignItems: 'center',
    },
    sectionIcon: {
      marginRight: '10px',
      fontSize: '20px',
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    infoItem: {
      marginBottom: '15px',
    },
    infoLabel: {
      fontSize: '14px',
      color: '#7f8c8d',
      marginBottom: '5px',
      display: 'block',
    },
    infoValue: {
      fontSize: '16px',
      color: '#2c3e50',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '5px',
      border: '1px solid #dcdde1',
      fontSize: '16px',
      color: '#2c3e50',
    },
    itemCard: {
      border: '1px solid #ecf0f1',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: '#f8f9fa',
    },
    itemTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '8px',
    },
    itemStatus: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      color: 'white',
      marginBottom: '8px',
    },
    itemDate: {
      fontSize: '14px',
      color: '#7f8c8d',
    },
    emptyState: {
      textAlign: 'center',
      color: '#7f8c8d',
      fontStyle: 'italic',
      padding: '20px',
    },
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div>Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <p>❌ {error}</p>
          <button 
            style={{...styles.button, ...styles.refreshButton}}
            onClick={fetchDashboardData}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { user: profileUser, bookings, complaints, notifications } = dashboardData;

  return (
    <div style={styles.container}>
      {/* Profile Section */}
      <div style={styles.profileContainer}>
        <div style={styles.profileHeader}>
          <div style={styles.avatarContainer}>
            <div style={styles.avatar}>
              {getInitials(profileUser?.name)}
            </div>
          </div>
          
          <div style={styles.studentInfo}>
            <h2 style={styles.studentName}>{profileUser?.name || 'Unknown User'}</h2>
            <p style={styles.regNumber}>{profileUser?.email || 'No email provided'}</p>
            <div style={styles.badgeContainer}>
              <span style={styles.badge}>{profileUser?.role || 'Student'}</span>
            </div>
          </div>
          
          <div style={styles.actionButtons}>
            <button 
              style={{...styles.button, ...styles.refreshButton}}
              onClick={fetchDashboardData}
            >
              🔄 Refresh
            </button>
            {!isEditing ? (
              <button 
                style={{...styles.button, ...styles.editButton}}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <>
                <button 
                  style={{...styles.button, ...styles.saveButton}}
                  onClick={handleSubmit}
                >
                  💾 Save
                </button>
                <button 
                  style={{...styles.button, ...styles.cancelButton}}
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: profileUser?.name || '',
                      email: profileUser?.email || '',
                      phone: profileUser?.phone || '',
                      address: profileUser?.address || '',
                      emergencyContact: profileUser?.emergencyContact || '',
                      bloodGroup: profileUser?.bloodGroup || '',
                    });
                  }}
                >
                  ❌ Cancel
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Personal Information Form */}
        <form onSubmit={handleSubmit}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>👤</span> Personal Information
          </h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <label style={styles.infoLabel}>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              ) : (
                <div style={styles.infoValue}>{profileUser?.name || 'Not provided'}</div>
              )}
            </div>
            
            <div style={styles.infoItem}>
              <label style={styles.infoLabel}>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              ) : (
                <div style={styles.infoValue}>{profileUser?.email || 'Not provided'}</div>
              )}
            </div>
            
            <div style={styles.infoItem}>
              <label style={styles.infoLabel}>Phone Number</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              ) : (
                <div style={styles.infoValue}>{profileUser?.phone || 'Not provided'}</div>
              )}
            </div>
            
            <div style={styles.infoItem}>
              <label style={styles.infoLabel}>Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              ) : (
                <div style={styles.infoValue}>{profileUser?.address || 'Not provided'}</div>
              )}
            </div>
            
            <div style={styles.infoItem}>
              <label style={styles.infoLabel}>Emergency Contact</label>
              {isEditing ? (
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              ) : (
                <div style={styles.infoValue}>{profileUser?.emergencyContact || 'Not provided'}</div>
              )}
            </div>
            
            <div style={styles.infoItem}>
              <label style={styles.infoLabel}>Blood Group</label>
              {isEditing ? (
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              ) : (
                <div style={styles.infoValue}>{profileUser?.bloodGroup || 'Not provided'}</div>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Dashboard Sections Grid */}
      <div style={styles.dashboardGrid}>
        {/* Bookings Section */}
        <div style={styles.sectionContainer}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>🏠</span> My Bookings ({bookings?.length || 0})
          </h3>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} style={styles.itemCard}>
                <div style={styles.itemTitle}>
                  Room Type: {booking.roomType || 'Not specified'}
                </div>
                <div 
                  style={{
                    ...styles.itemStatus,
                    backgroundColor: getStatusColor(booking.status)
                  }}
                >
                  {booking.status || 'Unknown'}
                </div>
                <div style={styles.itemDate}>
                  Check-in: {booking.checkInDate ? formatDate(booking.checkInDate) : 'Not set'}
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>No bookings found</div>
          )}
        </div>

        {/* Complaints Section */}
        <div style={styles.sectionContainer}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>📝</span> My Complaints ({complaints?.length || 0})
          </h3>
          {complaints && complaints.length > 0 ? (
            complaints.map((complaint) => (
              <div key={complaint._id} style={styles.itemCard}>
                <div style={styles.itemTitle}>
                  {complaint.title || 'Untitled Complaint'}
                </div>
                <div 
                  style={{
                    ...styles.itemStatus,
                    backgroundColor: getStatusColor(complaint.status)
                  }}
                >
                  {complaint.status || 'Unknown'}
                </div>
                <div style={styles.itemDate}>
                  Created: {complaint.createdAt ? formatDate(complaint.createdAt) : 'Unknown date'}
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>No complaints found</div>
          )}
        </div>

        {/* Notifications Section */}
        <div style={styles.sectionContainer}>
          <h3 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>🔔</span> Notifications ({notifications?.length || 0})
          </h3>
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification._id} style={styles.itemCard}>
                <div style={styles.itemTitle}>
                  {notification.message || 'No message'}
                </div>
                <div style={styles.itemDate}>
                  {notification.date ? formatDate(notification.date) : 'Unknown date'}
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>No notifications found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;