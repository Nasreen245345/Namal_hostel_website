import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import GalleryFilter from '../components/gallery/GalleryFilter';
import ImageGallery from '../components/gallery/ImageGallery';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    mainContent: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    pageHeader: {
      backgroundImage: 'linear-gradient(135deg, #3498db, #2c3e50)',
      color: 'white',
      padding: '60px 20px',
      textAlign: 'center',
      marginBottom: '30px',
    },
    heading: {
      fontSize: '36px',
      fontWeight: 'bold',
      margin: '0 0 15px 0',
    },
    subheading: {
      fontSize: '18px',
      fontWeight: 'normal',
      maxWidth: '700px',
      margin: '0 auto',
      opacity: '0.9',
    },
    gallerySection: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
      padding: '30px',
      marginBottom: '40px',
    },
    uploadSection: {
      backgroundColor: '#e8f4fc',
      borderRadius: '10px',
      padding: '25px',
      marginBottom: '40px',
      textAlign: 'center',
    },
    uploadTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '15px',
    },
    uploadDescription: {
      fontSize: '16px',
      color: '#596275',
      maxWidth: '600px',
      margin: '0 auto 20px auto',
      lineHeight: '1.5',
    },
    uploadButton: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '12px 25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    uploadButtonHover: {
      backgroundColor: '#27ae60',
    },
    statsSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    },
    statNumber: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#3498db',
      marginBottom: '5px',
    },
    statLabel: {
      fontSize: '16px',
      color: '#7f8c8d',
    },
    galleryNotes: {
      backgroundColor: '#f8f9fa',
      borderLeft: '4px solid #3498db',
      padding: '15px 20px',
      marginBottom: '30px',
      borderRadius: '0 5px 5px 0',
    },
    noteText: {
      margin: '0',
      fontSize: '15px',
      color: '#596275',
      lineHeight: '1.5',
    },
    noteHighlight: {
      fontWeight: 'bold',
      color: '#2c3e50',
    }
  };

  return (
    <div style={styles.pageContainer}>

      <div style={styles.pageHeader}>
        <h1 style={styles.heading}>Hostel Photo Gallery</h1>
        <p style={styles.subheading}>
          Explore our collection of images showcasing our facilities, rooms, campus, and student life at Namal Hostel
        </p>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.container}>
          <div style={styles.statsSection}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>300+</div>
              <div style={styles.statLabel}>Total Photos</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>4</div>
              <div style={styles.statLabel}>Categories</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>50+</div>
              <div style={styles.statLabel}>Student Uploads</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>Monthly</div>
              <div style={styles.statLabel}>Updates</div>
            </div>
          </div>

          <div style={styles.galleryNotes}>
            <p style={styles.noteText}>
              <span style={styles.noteHighlight}>Note:</span> Click on any image to view it in full size. 
              These images showcase various aspects of our hostel including rooms, common areas, recreational facilities, and events.
            </p>
          </div>

          <div style={styles.gallerySection}>
            <GalleryFilter 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
            <ImageGallery category={activeCategory} />
          </div>

          <div style={styles.uploadSection}>
            <h3 style={styles.uploadTitle}>Share Your Hostel Memories</h3>
            <p style={styles.uploadDescription}>
              Have amazing photos from hostel events, celebrations, or daily life? 
              Share them with the community by uploading to our gallery. 
              Approved submissions will be featured on this page.
            </p>
            <button 
              style={styles.uploadButton}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#27ae60';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#2ecc71';
              }}
            >
              Upload Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;