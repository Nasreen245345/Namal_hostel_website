import React, { useState, useEffect } from 'react';
import CounselorProfile from '../components/counseling/CounselorProfile';
import AppointmentForm from '../components/counseling/AppointmentForm';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Loader from '../components/common/Loader';

const CounselingPage = () => {
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, this would fetch from your API
    // For now, we'll simulate loading counselor data
    const fetchCounselors = async () => {
      try {
        setLoading(true);
        // Simulate API call with timeout
        setTimeout(() => {
          const mockCounselors = [
            {
              id: 1,
              name: "Dr. Sarah Ahmad",
              specialty: "Academic Counseling",
              education: "PhD in Psychology, University of Karachi",
              experience: "10+ years of experience in student counseling",
              availability: ["Monday: 9AM-12PM", "Wednesday: 2PM-5PM", "Friday: 10AM-1PM"],
              imageUrl: "/assets/images/counselors/sarah-ahmad.jpg",
              bio: "Dr. Sarah specializes in helping students overcome academic challenges and develop effective study strategies."
            },
            {
              id: 2,
              name: "Dr. Imran Khan",
              specialty: "Mental Health",
              education: "MD in Psychiatry, King Edward Medical University",
              experience: "8 years of clinical experience in university settings",
              availability: ["Tuesday: 10AM-2PM", "Thursday: 1PM-5PM"],
              imageUrl: "/assets/images/counselors/imran-khan.jpg",
              bio: "Dr. Imran focuses on mental wellbeing, stress management, and anxiety support for university students."
            },
            {
              id: 3,
              name: "Ms. Ayesha Malik",
              specialty: "Career Guidance",
              education: "MS in Career Counseling, LUMS",
              experience: "5 years of experience in career development",
              availability: ["Monday: 1PM-4PM", "Wednesday: 10AM-1PM", "Thursday: 9AM-12PM"],
              imageUrl: "/assets/images/counselors/ayesha-malik.jpg",
              bio: "Ms. Ayesha helps students explore career paths, prepare for interviews, and develop professional skills."
            }
          ];
          setCounselors(mockCounselors);
          setSelectedCounselor(mockCounselors[0]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load counselor data. Please try again later.");
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const handleCounselorSelect = (counselor) => {
    setSelectedCounselor(counselor);
    // Scroll to appointment form when counselor is selected
    document.getElementById('appointment-section').scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <>
      <div className="counseling-page">
        <div className="counseling-hero">
          <div className="container">
            <h1>Counseling Support Services</h1>
            <p>
              At Namal Residency, we care about your mental health and wellbeing. 
              Our professional counselors are here to support you through academic 
              challenges, personal issues, and career planning.
            </p>
          </div>
        </div>

        <section className="counselors-section">
          <div className="container">
            <h2>Meet Our Counselors</h2>
            <p>Choose a counselor to view their profile and schedule an appointment</p>
            
            <div className="counselors-grid">
              {counselors.map((counselor) => (
                <div 
                  key={counselor.id} 
                  className={`counselor-card ${selectedCounselor?.id === counselor.id ? 'selected' : ''}`}
                  onClick={() => handleCounselorSelect(counselor)}
                >
                  <div className="counselor-card-inner">
                    <div className="counselor-image-container">
                      <img 
                        src={counselor.imageUrl} 
                        alt={counselor.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/images/placeholder.png";
                        }}
                      />
                    </div>
                    <h3>{counselor.name}</h3>
                    <p className="specialty">{counselor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {selectedCounselor && (
          <>
            <section className="profile-section">
              <div className="container">
                <CounselorProfile counselor={selectedCounselor} />
              </div>
            </section>

            <section id="appointment-section" className="appointment-section">
              <div className="container">
                <h2>Book an Appointment</h2>
                <AppointmentForm counselor={selectedCounselor} />
              </div>
            </section>
          </>
        )}

        <section className="resources-section">
          <div className="container">
            <h2>Additional Resources</h2>
            <div className="resources-grid">
              <div className="resource-card">
                <h3>Mental Health Tips</h3>
                <p>Learn strategies for maintaining good mental health during academic pressures.</p>
                <a href="/resources/mental-health" className="resource-link">Read More</a>
              </div>
              <div className="resource-card">
                <h3>Study Skills Workshop</h3>
                <p>Register for our weekly workshops on effective study techniques.</p>
                <a href="/resources/workshops" className="resource-link">Sign Up</a>
              </div>
              <div className="resource-card">
                <h3>Crisis Support</h3>
                <p>24/7 helpline for students experiencing mental health emergencies.</p>
                <a href="/resources/crisis" className="resource-link">Get Help</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CounselingPage;