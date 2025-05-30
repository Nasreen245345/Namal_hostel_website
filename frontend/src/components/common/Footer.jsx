import React from 'react';
import { Link } from 'react-router-dom';
import facebook from '../../assets/images/facebook-icon.svg'
import instagram from '../../assets/images/instagram-icon.svg'
import Linkedin from '../../assets/images/linkedin-icon.svg'
import twitter from '../../assets/images/twitter-icon.svg'
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">Namal Hostel</h3>
            <p className="footer-description">
              Providing comfortable and affordable accommodation for Namal University students with
              modern facilities and a supportive environment.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/namaluniversitylive" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src={facebook} alt=""   width="24"
                              height="24"></img>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <img src={twitter} alt=""   width="24"
                              height="24"
                              loading="lazy"></img>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src={instagram} alt=""   width="24"
                              height="24"
                              loading="lazy"></img>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src={Linkedin} alt=""   width="24"
                              height="24"
                              loading="lazy"></img>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/hostel-info">Hostel Info</Link>
              </li>
              <li>
                <Link to="/room-booking">Room Booking</Link>
              </li>
              <li>
                <Link to="/fee-structure">Fee Structure</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Student Services</h3>
            <ul className="footer-links">
              <li>
                <Link to="/complaint">File Complaint</Link>
              </li>
              <li>
                <Link to="/lost-found">Lost & Found</Link>
              </li>
              <li>
                <Link to="/counseling">Counseling Support</Link>
              </li>
              <li>
                <Link to="/menu">Menu Updates</Link>
              </li>
              <li>
                <Link to="/dashboard">Student Dashboard</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Namal University, Mianwali, Pakistan</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>+92 123 456 7890</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>hostel@namal.edu.pk</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Office Hours: 9am - 5pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Namal Hostel. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--primary-color);
          color: var(--text-light);
          padding: 4rem 0 2rem;
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 10rem;
        }
        
        .footer-title {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--text-light);
          position: relative;
        }
        
        .footer-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.5rem;
          width: 3rem;
          height: 2px;
          background-color: var(--accent-color);
        }
        
        .footer-description {
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .footer-social {
          display: flex;
          gap: 1rem;
        }
        
        .footer-social a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: rgba(49, 44, 44, 0.89);
          border-radius: 50%;
          color: var(--text-light);
          transition: var(--transition);
        }
        
        .footer-social a:hover {
          background-color: var(--accent-color);
          transform: translateY(-3px);
        }
        
        .footer-links,
        .footer-contact {
          list-style: none;
          padding: 0;
        }
        
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        
        .footer-links a {
          color: var(--text-light);
          transition: var(--transition);
        }
        
        .footer-links a:hover {
          color: var(--accent-color);
          padding-left: 5px;
        }
        
        .footer-contact li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        
        .footer-contact i {
          margin-right: 1rem;
          color: var(--accent-color);
        }
        
        .footer-bottom {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .footer-bottom-links {
          display: flex;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }
        
        .footer-bottom-links a {
          color: var(--text-light);
          opacity: 0.8;
          transition: var(--transition);
        }
        
        .footer-bottom-links a:hover {
          opacity: 1;
          color: var(--accent-color);
        }
        
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap:3rem;
            place-items:center;
          }
          .footer-section{
          place-items:center;
          }
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
          
          .footer-bottom-links {
            margin-top: 0;
          }
        }
        
        @media (min-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;