import React, { useState } from 'react';

const CounselorProfile = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  
  // Styling
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      maxWidth: '700px',
      margin: '0 auto',
    },
    counselorsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '30px',
      marginBottom: '40px',
    },
    counselorCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    cardSelected: {
      transform: 'translateY(-10px)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
      border: '2px solid #1e88e5',
    },
    counselorImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
    },
    counselorInfo: {
      padding: '20px',
    },
    counselorName: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333',
    },
    counselorTitle: {
      fontSize: '14px',
      color: '#1e88e5',
      marginBottom: '10px',
    },
    counselorDescription: {
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#666',
      marginBottom: '15px',
    },
    counselorSpecialties: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginBottom: '10px',
    },
    specialtyTag: {
      backgroundColor: '#e3f2fd',
      color: '#1e88e5',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
    },
    counselorDetails: {
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      padding: '30px',
      marginTop: '30px',
      display: selectedCounselor ? 'block' : 'none',
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '30px',
      alignItems: 'start',
    },
    detailsImage: {
      width: '100%',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    detailsContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    detailsHeader: {
      marginBottom: '15px',
    },
    detailsName: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '5px',
    },
    detailsTitle: {
      fontSize: '16px',
      color: '#1e88e5',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#333',
    },
    availabilityGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '10px',
    },
    availabilityItem: {
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '4px',
      textAlign: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    day: {
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333',
      fontSize: '14px',
    },
    time: {
      color: '#666',
      fontSize: '12px',
    },
    button: {
      backgroundColor: '#1e88e5',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 20px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      width: 'fit-content',
      marginTop: '15px',
    },
    buttonHover: {
      backgroundColor: '#1565c0',
    }
  };

  // Mock data for counselors
  const counselors = [
    {
      id: 1,
      name: 'Dr. Aisha Khan',
      title: 'Clinical Psychologist',
      image: 'https://via.placeholder.com/300x250?text=Dr.+Aisha+Khan',
      shortDescription: 'Specialized in helping students manage academic stress and anxiety.',
      specialties: ['Anxiety', 'Depression', 'Academic Stress'],
      fullDescription: 'Dr. Aisha Khan has over 10 years of experience helping university students overcome mental health challenges. She uses a combination of cognitive-behavioral therapy and mindfulness techniques to help students develop resilience and coping strategies.',
      education: [
        'PhD in Clinical Psychology, University of Lahore',
        'Masters in Psychology, GC University',
        'Licensed Clinical Psychologist'
      ],
      availability: [
        { day: 'Monday', time: '9:00 AM - 12:00 PM' },
        { day: 'Wednesday', time: '1:00 PM - 5:00 PM' },
        { day: 'Friday', time: '10:00 AM - 3:00 PM' }
      ],
      contactInfo: {
        email: 'dr.aisha@namal.edu.pk',
        phone: '042-1234567'
      }
    },
    {
      id: 2,
      name: 'Mr. Tariq Ahmed',
      title: 'Career Counselor',
      image: 'https://via.placeholder.com/300x250?text=Mr.+Tariq+Ahmed',
      shortDescription: 'Helps students with career planning, internships, and job placements.',
      specialties: ['Career Planning', 'Interview Prep', 'Resume Building'],
      fullDescription: 'Mr. Tariq Ahmed works closely with students to help them identify their strengths and career goals. He provides guidance on internship opportunities, job applications, and interview preparation. He has helped hundreds of students secure positions at top companies.',
      education: [
        'MBA, LUMS',
        'BBA, IBA Karachi',
        'Certified Career Counselor'
      ],
      availability: [
        { day: 'Tuesday', time: '10:00 AM - 2:00 PM' },
        { day: 'Thursday', time: '1:00 PM - 5:00 PM' }
      ],
      contactInfo: {
        email: 'tariq.ahmed@namal.edu.pk',
        phone: '042-7654321'
      }
    },
    {
      id: 3,
      name: 'Ms. Sara Malik',
      title: 'Student Life Advisor',
      image: 'https://via.placeholder.com/300x250?text=Ms.+Sara+Malik',
      shortDescription: 'Specializes in helping students adjust to university life and build social connections.',
      specialties: ['Social Adjustment', 'Homesickness', 'Time Management'],
      fullDescription: 'Ms. Sara Malik understands the challenges students face when transitioning to university life. She provides support and guidance to help students develop time management skills, build social connections, and find a healthy work-life balance.',
      education: [
        'Masters in Education Counseling, University of Punjab',
        'BA in Psychology, University of Karachi',
        'Certified Student Affairs Professional'
      ],
      availability: [
        { day: 'Monday', time: '2:00 PM - 5:00 PM' },
        { day: 'Wednesday', time: '9:00 AM - 12:00 PM' },
        { day: 'Thursday', time: '10:00 AM - 1:00 PM' }
      ],
      contactInfo: {
        email: 'sara.malik@namal.edu.pk',
        phone: '042-9876543'
      }
    }
  ];

  const handleCounselorSelect = (counselor) => {
    setSelectedCounselor(counselor);
    // Scroll to details section
    setTimeout(() => {
      document.getElementById('counselorDetails').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Button hover state
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Meet Our Counselors</h1>
        <p style={styles.subtitle}>
          Our team of professional counselors is here to support your mental health, 
          career development, and overall well-being during your stay at Namal Residency.
        </p>
      </div>

      <div style={styles.counselorsGrid}>
        {counselors.map(counselor => (
          <div 
            key={counselor.id} 
            style={{
              ...styles.counselorCard,
              ...(selectedCounselor && selectedCounselor.id === counselor.id ? styles.cardSelected : {})
            }}
            onClick={() => handleCounselorSelect(counselor)}
          >
            <img src={counselor.image} alt={counselor.name} style={styles.counselorImage} />
            <div style={styles.counselorInfo}>
              <h3 style={styles.counselorName}>{counselor.name}</h3>
              <p style={styles.counselorTitle}>{counselor.title}</p>
              <p style={styles.counselorDescription}>{counselor.shortDescription}</p>
              <div style={styles.counselorSpecialties}>
                {counselor.specialties.map((specialty, index) => (
                  <span key={index} style={styles.specialtyTag}>{specialty}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="counselorDetails" style={styles.counselorDetails}>
        {selectedCounselor && (
          <div style={styles.detailsGrid}>
            <img 
              src={selectedCounselor.image} 
              alt={selectedCounselor.name} 
              style={styles.detailsImage} 
            />
            <div style={styles.detailsContent}>
              <div style={styles.detailsHeader}>
                <h2 style={styles.detailsName}>{selectedCounselor.name}</h2>
                <p style={styles.detailsTitle}>{selectedCounselor.title}</p>
              </div>
              
              <div>
                <p>{selectedCounselor.fullDescription}</p>
              </div>
              
              <div>
                <h3 style={styles.sectionTitle}>Education & Qualifications</h3>
                <ul>
                  {selectedCounselor.education.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 style={styles.sectionTitle}>Availability</h3>
                <div style={styles.availabilityGrid}>
                  {selectedCounselor.availability.map((slot, index) => (
                    <div key={index} style={styles.availabilityItem}>
                      <div style={styles.day}>{slot.day}</div>
                      <div style={styles.time}>{slot.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 style={styles.sectionTitle}>Contact Information</h3>
                <p>Email: {selectedCounselor.contactInfo.email}</p>
                <p>Phone: {selectedCounselor.contactInfo.phone}</p>
              </div>
              
              <button 
                style={{
                  ...styles.button,
                  ...(isButtonHovered ? styles.buttonHover : {})
                }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                onClick={() => window.location.href = '/counseling/appointment'}
              >
                Book an Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounselorProfile;
// import React from 'react';
// import Button from '../common/Button';

// const CounselorProfile = ({ counselor }) => {
//   if (!counselor) return null;

//   return (
//     <div className="counselor-profile">
//       <div className="profile-header">
//         <div className="profile-image">
//           <img 
//             src={counselor.imageUrl} 
//             alt={counselor.name}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/assets/images/placeholder.png";
//             }}
//           />
//         </div>
//         <div className="profile-intro">
//           <h2>{counselor.name}</h2>
//           <h3>{counselor.specialty}</h3>
//           <p className="education">{counselor.education}</p>
//           <p className="experience">{counselor.experience}</p>
//         </div>
//       </div>

//       <div className="profile-details">
//         <div className="bio-section">
//           <h3>About</h3>
//           <p>{counselor.bio}</p>
//         </div>

//         <div className="availability-section">
//           <h3>Availability</h3>
//           <ul className="availability-list">
//             {counselor.availability.map((slot, index) => (
//               <li key={index} className="availability-slot">
//                 {slot}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="profile-actions">
//         <Button 
//           text="Book Appointment" 
//           type="primary" 
//           onClick={() => document.getElementById('appointment-section').scrollIntoView({ behavior: 'smooth' })}
//         />
//         <Button 
//           text="Contact Directly" 
//           type="secondary" 
//           onClick={() => window.location.href = `mailto:counseling@namal.edu.pk?subject=Inquiry for ${counselor.name}`}
//         />
//       </div>
//     </div>
//   );
// };

// export default CounselorProfile;