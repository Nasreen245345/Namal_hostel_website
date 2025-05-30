import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentProfile from '../components/dashboard/StudentProfile';
import Bookings from '../components/dashboard/Bookings';
import Complaints from '../components/dashboard/Complaints';
import Notifications from '../components/dashboard/Notifications';
import useAuth from '../hooks/useAuth';
import Loader from '../components/common/Loader';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Simulate fetching student data
    const fetchStudentData = async () => {
      try {
        // Replace with actual API call when backend is ready
        // const response = await api.get('/student/profile');
        // setStudentData(response.data);
        
        // Mock data for development
        setTimeout(() => {
          setStudentData({
            id: user?.id || '12345',
            name: user?.name || 'John Doe',
            rollNumber: 'NAM-2022-123',
            department: 'Computer Science',
            semester: '5th',
            hostelBlock: 'Block A',
            roomNumber: 'A-204',
            contactNumber: '+92 300 1234567',
            email: user?.email || 'john.doe@example.com',
            profileImage: 'https://via.placeholder.com/150',
            bookings: [
              { id: 1, roomType: 'Double Bed', block: 'A', roomNo: 'A-204', startDate: '2023-09-01', endDate: '2024-06-30', status: 'Active' },
              { id: 2, roomType: 'Double Bed', block: 'A', roomNo: 'A-108', startDate: '2022-09-01', endDate: '2023-06-30', status: 'Completed' }
            ],
            complaints: [
              { id: 101, title: 'Water Leakage', description: 'Water leaking from bathroom ceiling', date: '2023-11-15', status: 'Pending' },
              { id: 102, title: 'Broken Chair', description: 'Chair in room is broken', date: '2023-10-28', status: 'Resolved' }
            ],
            notifications: [
              { id: 1001, title: 'Maintenance Notice', message: 'Water supply will be interrupted on Sunday from 10AM to 2PM for maintenance work.', date: '2023-11-20', read: false },
              { id: 1002, title: 'Fee Reminder', message: 'Hostel fee for the spring semester is due by January 15th.', date: '2023-11-18', read: true },
              { id: 1003, title: 'Event Invitation', message: 'You are invited to the hostel welcome party on December 1st at 7PM in the common room.', date: '2023-11-10', read: true }
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [isAuthenticated, navigate, user]);

  // Render tab content based on active tab
  const renderTabContent = () => {
    if (loading) return <Loader />;
    if (!studentData) return <div className="error-message">Failed to load student data</div>;

    switch (activeTab) {
      case 'profile':
        return <StudentProfile studentData={studentData} />;
      case 'bookings':
        return <Bookings bookings={studentData.bookings} />;
      case 'complaints':
        return <Complaints complaints={studentData.complaints} />;
      case 'notifications':
        return <Notifications notifications={studentData.notifications} />;
      default:
        return <StudentProfile studentData={studentData} />;
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>
      
      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <div className="user-info">
            {!loading && studentData && (
              <>
                <div className="avatar">
                  <img src={studentData.profileImage} alt={studentData.name} />
                </div>
                <h3>{studentData.name}</h3>
                <p>{studentData.rollNumber}</p>
              </>
            )}
          </div>

          <nav className="dashboard-nav">
            <ul>
              <li 
                className={activeTab === 'profile' ? 'active' : ''} 
                onClick={() => setActiveTab('profile')}
              >
                <i className="fas fa-user"></i> Profile
              </li>
              <li 
                className={activeTab === 'bookings' ? 'active' : ''} 
                onClick={() => setActiveTab('bookings')}
              >
                <i className="fas fa-bed"></i> Room Bookings
              </li>
              <li 
                className={activeTab === 'complaints' ? 'active' : ''} 
                onClick={() => setActiveTab('complaints')}
              >
                <i className="fas fa-exclamation-triangle"></i> Complaints
              </li>
              <li 
                className={activeTab === 'notifications' ? 'active' : ''} 
                onClick={() => setActiveTab('notifications')}
              >
                <i className="fas fa-bell"></i> Notifications
                {!loading && studentData && studentData.notifications.filter(n => !n.read).length > 0 && (
                  <span className="notification-badge">
                    {studentData.notifications.filter(n => !n.read).length}
                  </span>
                )}
              </li>
            </ul>
          </nav>
        </div>

        <div className="dashboard-main">
          {renderTabContent()}
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-title {
          color: #2c3e50;
          margin-bottom: 2rem;
          text-align: center;
          font-size: 2rem;
          position: relative;
        }

        .dashboard-title:after {
          content: '';
          display: block;
          width: 100px;
          height: 3px;
          background: #3498db;
          margin: 10px auto 0;
        }

        .dashboard-content {
          display: flex;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .dashboard-sidebar {
          width: 250px;
          background: #2c3e50;
          color: #ecf0f1;
          padding: 2rem 0;
        }

        .user-info {
          text-align: center;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1.5rem;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1rem;
          border: 3px solid #3498db;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-info h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .user-info p {
          margin: 0.5rem 0 0;
          font-size: 0.9rem;
          opacity: 0.7;
        }

        .dashboard-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .dashboard-nav li {
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          position: relative;
        }

        .dashboard-nav li i {
          margin-right: 10px;
          width: 20px;
          text-align: center;
        }

        .dashboard-nav li:hover {
          background: rgba(52, 152, 219, 0.2);
        }

        .dashboard-nav li.active {
          background: #3498db;
          font-weight: bold;
        }

        .notification-badge {
          background: #e74c3c;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
        }

        .dashboard-main {
          flex: 1;
          padding: 2rem;
          overflow: auto;
        }

        .error-message {
          color: #e74c3c;
          text-align: center;
          padding: 2rem;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .dashboard-content {
            flex-direction: column;
          }

          .dashboard-sidebar {
            width: 100%;
            padding: 1rem 0;
          }

          .user-info {
            padding-bottom: 1rem;
            margin-bottom: 1rem;
          }

          .avatar {
            width: 80px;
            height: 80px;
            margin-bottom: 0.5rem;
          }

          .dashboard-nav ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }

          .dashboard-nav li {
            padding: 0.5rem 1rem;
            margin: 0.25rem;
            border-radius: 20px;
            background: rgba(52, 152, 219, 0.1);
          }

          .dashboard-nav li.active {
            background: #3498db;
          }

          .notification-badge {
            position: static;
            transform: none;
            margin-left: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;