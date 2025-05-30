import React, { useState, useEffect } from 'react';

const TestimonialsSection = () => {
  const styles = {
    section: {
      padding: '80px 0',
      backgroundColor: '#f8f9fa',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '60px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#6b7280',
      maxWidth: '700px',
      margin: '0 auto',
    },
    testimonialSlider: {
      position: 'relative',
      maxWidth: '900px',
      margin: '0 auto',
      overflow: 'hidden',
    },
    testimonialWrapper: {
      display: 'flex',
      transition: 'transform 0.5s ease',
    },
    testimonial: {
      minWidth: '100%',
      padding: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    testimonialText: {
      fontSize: '1.2rem',
      lineHeight: '1.8',
      color: '#4b5563',
      marginBottom: '30px',
      fontStyle: 'italic',
    },
    quoteIcon: {
      fontSize: '2rem',
      color: '#1e3a8a',
      opacity: '0.3',
      marginBottom: '20px',
    },
    studentInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    studentImage: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginRight: '15px',
    },
    studentDetails: {
      textAlign: 'left',
    },
    studentName: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#1e3a8a',
    },
    studentProgram: {
      fontSize: '0.9rem',
      color: '#6b7280',
    },
    sliderControls: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
      gap: '10px',
    },
    sliderDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#d1d5db',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    sliderDotActive: {
      backgroundColor: '#1e3a8a',
    },
    sliderArrow: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      zIndex: 10,
    },
    prevArrow: {
      left: '0px',
    },
    nextArrow: {
      right: '0px',
    }
  };

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      text: "Living at Namal Residency has been an incredible experience. The facilities are top-notch, and the staff is always helpful. The environment is perfect for both studying and socializing. I've made lifelong friends here!",
      name: "Ahmad Khalid",
      program: "BS Computer Science, 3rd Year",
      image: "/api/placeholder/60/60" // Using placeholder image
    },
    {
      id: 2,
      text: "As an international student, I was worried about accommodation, but Namal Residency exceeded my expectations. The rooms are comfortable, the food is great, and the community is very welcoming. It truly feels like a home away from home.",
      name: "Ayesha Khan",
      program: "BS Electrical Engineering, 2nd Year",
      image: "/api/placeholder/60/60" // Using placeholder image
    },
    {
      id: 3,
      text: "The best thing about Namal Residency is how they balance academic needs with recreational activities. The study areas are quiet and well-maintained, and there are plenty of opportunities to engage in sports and other extracurricular activities.",
      name: "Usman Ali",
      program: "BS Business Administration, 4th Year",
      image: "/api/placeholder/60/60" // Using placeholder image
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  // Handle navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoplay(false); // Pause autoplay when user interacts
    setTimeout(() => setAutoplay(true), 10000); // Resume autoplay after 10 seconds
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.heading}>
          <h2 style={styles.title}>What Our Students Say</h2>
          <p style={styles.subtitle}>
            Hear from the students who call Namal Residency their home
          </p>
        </div>

        <div style={styles.testimonialSlider}>
          <button 
            style={{
              ...styles.sliderArrow, 
              ...styles.prevArrow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={goToPrevSlide}
            aria-label="Previous testimonial"
          >
            &#8249;
          </button>
          
          <div 
            style={{
              ...styles.testimonialWrapper,
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                style={styles.testimonial}
              >
                <div style={styles.quoteIcon}>"</div>
                <p style={styles.testimonialText}>{testimonial.text}</p>
                <div style={styles.studentInfo}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    style={styles.studentImage} 
                  />
                  <div style={styles.studentDetails}>
                    <h4 style={styles.studentName}>{testimonial.name}</h4>
                    <p style={styles.studentProgram}>{testimonial.program}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            style={{
              ...styles.sliderArrow, 
              ...styles.nextArrow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={goToNextSlide}
            aria-label="Next testimonial"
          >
            &#8250;
          </button>
        </div>

        <div style={styles.sliderControls}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.sliderDot,
                ...(index === currentSlide ? styles.sliderDotActive : {}),
              }}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;