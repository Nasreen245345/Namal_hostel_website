import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "/src/hooks/useAuth.jsx";
import Namallogo from "../../assets/images/Namal-logo.png";
import { useRef } from "react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={Namallogo} alt="Namal Hostel" className="logo" />
          <span>Namal Hostel</span>
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/hostel-info"
              className={location.pathname === "/hostel-info" ? "active" : ""}
            >
              Hostel Info
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/room-booking"
              className={location.pathname === "/room-booking" ? "active" : ""}
            >
              Room Booking
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/fee-structure"
              className={location.pathname === "/fee-structure" ? "active" : ""}
            >
              Fee Structure
            </Link>
          </li>
          <li className="navbar-item">
            <a
              href="#footer"
              className={location.hash === "#footer" ? "active" : ""}
            >
              Student Services
            </a>
          </li>
          <li className="navbar-item">
            <Link
              to="/gallery"
              className={location.pathname === "/gallery" ? "active" : ""}
            >
              Gallery
            </Link>
          </li>
        </ul>

        <div className="navbar-auth">
          {user ? (
            <>
              <Link to="/dashboard" className="navbar-dashboard">
                Dashboard
              </Link>
              <button onClick={logout} className="btn btn-secondary navbar-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-login">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary navbar-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
      

        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: var(--bg-primary);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: var(--transition);
          padding: 1rem 0;
        }
        
        .navbar-scrolled {
          padding: 0.5rem 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          gap:15px;
          align-items: center;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .navbar-logo {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 700;
          padding-left:0px;>
          color: var(--primary-color);
        }
        
        .navbar-logo img {
          height: 70px;
          margin-right: 0.5rem;
        }
        
        .navbar-menu {
          display: flex;
          list-style: none;
        }
        
        .navbar-item {
          margin: 0 0.20rem;
        }
        
        .navbar-item a {
          color: var(--text-primary);
          font-weight: 500;
          padding: 0.5rem;
          transition: var(--transition);
        }
        
        .navbar-item a:hover,
        .navbar-item a.active {
          color: var(--primary-color);
        }
        
        .navbar-auth {
          display: flex;
          align-items: center;
        }
        
        .navbar-login {
          margin-right: 1rem;
          font-weight: 500;
        }
        
        .navbar-dashboard {
          margin-right: 1rem;
          font-weight: 500;
          color: var(--primary-color);
        }
        
        .navbar-btn {
          padding: 0.5rem 1rem;
        }
        
        .navbar-toggle {
          display: none;
          cursor: pointer;
        }
        
        .navbar-toggle-icon {
          display: block;
          width: 25px;
          height: 3px;
          background-color: var(--text-primary);
          position: relative;
          transition: var(--transition);
        }
        
        .navbar-toggle-icon::before,
        .navbar-toggle-icon::after {
          content: '';
          position: absolute;
          width: 25px;
          height: 3px;
          background-color: var(--text-primary);
          transition: var(--transition);
        }
        
        .navbar-toggle-icon::before {
          transform: translateY(-8px);
        }
        
        .navbar-toggle-icon::after {
          transform: translateY(8px);
        }
        
        @media (max-width: 992px) {
          .navbar-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            flex-direction: column;
            background-color: var(--bg-primary);
            width: 100%;
            padding: 1rem 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: var(--transition);
          }
          
          .navbar-menu.active {
            left: 0;
          }
          
          .navbar-item {
            margin: 0.5rem 0;
            text-align: center;
          }
          
          .navbar-toggle {
            display: block;
          }
          
          .navbar-auth {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
