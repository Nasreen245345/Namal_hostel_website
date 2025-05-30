import React, { useState, useEffect } from 'react';
import  useAuth  from '../../hooks/useAuth';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComplaint, setNewComplaint] = useState({ 
    title: '', 
    description: '', 
    category: 'Maintenance' 
  });
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
    button: {
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    list: {
      listStyle: 'none',
      padding: '0'
    },
    listItem: {
      backgroundColor: 'white',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '6px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'relative'
    },
    statusBadge: (status) => ({
      position: 'absolute',
      top: '15px',
      right: '15px',
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: 
        status === 'Resolved' ? '#4caf50' :
        status === 'In Progress' ? '#ff9800' : 
        '#f44336',
      color: 'white'
    }),
    complaintTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      paddingRight: '90px'
    },
    complaintMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: '#666',
      marginBottom: '10px'
    },
    complaintDesc: {
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '15px'
    },
    form: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      minHeight: '100px',
      resize: 'vertical'
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: 'white'
    },
    submitButton: {
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      width: '100%'
    },
    emptyState: {
      textAlign: 'center',
      padding: '30px',
      color: '#666'
    }
  };

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate fetching data from API
    setTimeout(() => {
      const mockComplaints = [
        {
          id: 1,
          title: 'Water leakage in bathroom',
          category: 'Maintenance',
          description: 'There is a water leakage under the sink in my bathroom that needs to be fixed.',
          status: 'In Progress',
          date: '2025-05-10',
          response: 'Maintenance team has been notified and will visit tomorrow.'
        },
        {
          id: 2,
          title: 'WiFi not working in Room 302',
          category: 'Internet',
          description: 'The WiFi connection has been unstable for the past two days in our room.',
          status: 'Open',
          date: '2025-05-15',
          response: null
        },
        {
          id: 3,
          title: 'Broken chair',
          category: 'Furniture',
          description: 'One of the chairs in my room is broken and needs replacement.',
          status: 'Resolved',
          date: '2025-05-01',
          response: 'Chair has been replaced on May 3rd.'
        }
      ];
      
      setComplaints(mockComplaints);
      setLoading(false);
    }, 1000);
  }, []);

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint({
      ...newComplaint,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    const newComplaintObj = {
      id: complaints.length + 1,
      title: newComplaint.title,
      category: newComplaint.category,
      description: newComplaint.description,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      response: null
    };
    
    setComplaints([newComplaintObj, ...complaints]);
    setNewComplaint({ title: '', description: '', category: 'Maintenance' });
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>My Complaints</h2>
        <button 
          style={styles.button} 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'New Complaint'}
        </button>
      </div>

      {showForm && (
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newComplaint.title}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={newComplaint.category}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="Maintenance">Maintenance</option>
              <option value="Internet">Internet</option>
              <option value="Furniture">Furniture</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Security">Security</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newComplaint.description}
              onChange={handleInputChange}
              style={styles.textarea}
              required
            />
          </div>
          
          <button type="submit" style={styles.submitButton}>Submit Complaint</button>
        </form>
      )}

      {loading ? (
        <p>Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <div style={styles.emptyState}>
          <p>You haven't submitted any complaints yet.</p>
        </div>
      ) : (
        <ul style={styles.list}>
          {complaints.map(complaint => (
            <li key={complaint.id} style={styles.listItem}>
              <div style={styles.statusBadge(complaint.status)}>{complaint.status}</div>
              <h3 style={styles.complaintTitle}>{complaint.title}</h3>
              <div style={styles.complaintMeta}>
                <span>Category: {complaint.category}</span>
                <span>Date: {complaint.date}</span>
              </div>
              <p style={styles.complaintDesc}>{complaint.description}</p>
              {complaint.response && (
                <div style={{
                  backgroundColor: '#f0f7ff',
                  padding: '10px 15px',
                  borderRadius: '6px',
                  borderLeft: '4px solid #4a90e2'
                }}>
                  <p style={{ margin: '0', fontSize: '14px' }}>
                    <strong>Response:</strong> {complaint.response}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Complaints;