import React, { useState, useEffect } from 'react';

const ImageGallery = ({ category }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Mock data - in a real application, you would fetch this from your API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const allImages = [
        {
          id: 1,
          url: '/assets/images/hostel-exterior.jpg',
          title: 'Hostel Main Building',
          description: 'Front view of the hostel main building',
          category: 'exterior'
        },
        {
          id: 2,
          url: '/assets/images/room-double.jpg',
          title: 'Double Bed Room',
          description: 'Comfortable double bed room with study table',
          category: 'rooms'
        },
        {
          id: 3,
          url: '/assets/images/room-fourth.jpg',
          title: 'Four Bed Room',
          description: 'Spacious four bed accommodation with attached bathroom',
          category: 'rooms'
        },
        {
          id: 4,
          url: '/assets/images/room-sixth.jpg',
          title: 'Six Bed Dormitory',
          description: 'Economical six bed dormitory style room',
          category: 'rooms'
        },
        {
          id: 5,
          url: '/assets/images/logo.png',
          title: 'Namal Logo',
          description: 'Official logo of Namal Institution',
          category: 'events'
        },
        // Additional mock images with different categories
        {
          id: 6,
          url: '/assets/images/hostel-exterior.jpg', // Reusing existing image
          title: 'Cafeteria',
          description: 'Modern cafeteria serving nutritious meals',
          category: 'facilities'
        },
        {
          id: 7,
          url: '/assets/images/room-double.jpg', // Reusing existing image
          title: 'Study Hall',
          description: 'Quiet study hall with high-speed internet',
          category: 'facilities'
        },
        {
          id: 8,
          url: '/assets/images/room-fourth.jpg', // Reusing existing image
          title: 'Annual Sports Day',
          description: 'Students participating in annual sports competition',
          category: 'events'
        },
        {
          id: 9,
          url: '/assets/images/room-sixth.jpg', // Reusing existing image
          title: 'Hostel Garden',
          description: 'Beautiful garden area for relaxation',
          category: 'exterior'
        }
      ];

      // Filter images by category if a category is provided
      if (category && category !== 'all') {
        setImages(allImages.filter(img => img.category === category));
      } else {
        setImages(allImages);
      }
      
      setLoading(false);
    }, 1000);
  }, [category]);

  const styles = {
    container: {
      padding: '20px 0',
    },
    galleryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
    },
    imageCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    imageCardHover: {
      transform: 'translateY(-5px)',
    },
    image: {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      display: 'block',
    },
    imageCaption: {
      padding: '15px',
    },
    imageTitle: {
      margin: '0 0 8px 0',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    imageDescription: {
      margin: '0',
      fontSize: '14px',
      color: '#7f8c8d',
      lineHeight: '1.4',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
    },
    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '5px solid rgba(0, 0, 0, 0.1)',
      borderLeftColor: '#3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    noImagesMessage: {
      textAlign: 'center',
      padding: '40px 0',
      color: '#7f8c8d',
      fontSize: '18px',
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '1000',
      padding: '20px',
    },
    modalContent: {
      position: 'relative',
      maxWidth: '90%',
      maxHeight: '90%',
    },
    modalImage: {
      maxWidth: '100%',
      maxHeight: '80vh',
      display: 'block',
      borderRadius: '4px',
    },
    modalClose: {
      position: 'absolute',
      top: '-40px',
      right: '0',
      background: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '30px',
      cursor: 'pointer',
    },
    modalCaption: {
      color: 'white',
      textAlign: 'center',
      marginTop: '15px',
      fontSize: '16px',
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    // Restore scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
        </div>
      ) : images.length === 0 ? (
        <div style={styles.noImagesMessage}>
          No images found for this category.
        </div>
      ) : (
        <div style={styles.galleryGrid}>
          {images.map((image) => (
            <div 
              key={image.id} 
              style={styles.imageCard}
              onClick={() => openModal(image)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
            >
              <img 
                src={image.url} 
                alt={image.title} 
                style={styles.image} 
              />
              <div style={styles.imageCaption}>
                <h3 style={styles.imageTitle}>{image.title}</h3>
                <p style={styles.imageDescription}>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div 
          style={styles.modal}
          onClick={closeModal}
        >
          <div 
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              style={styles.modalClose}
              onClick={closeModal}
            >
              ×
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              style={styles.modalImage} 
            />
            <div style={styles.modalCaption}>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ImageGallery;