import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import HostelInfoPage from './pages/HostelInfoPage';
import RoomBookingPage from './pages/RoomBookingPage';
import FeeStructurePage from './pages/FeeStructurePage';
import ComplaintPage from './pages/ComplaintPage';
import LostFoundPage from './pages/LostFoundPage';
import CounselingPage from './pages/CounselingPage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './context/AuthContext';
import "./styles/global.css";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hostel-info" element={<HostelInfoPage />} />
              <Route path="/room-booking" element={<RoomBookingPage />} />
              <Route path="/fee-structure" element={<FeeStructurePage />} />
              <Route path="/complaint" element={<ComplaintPage />} />
              <Route path="/lost-found" element={<LostFoundPage />} />
              <Route path="/counseling" element={<CounselingPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard/*" element={<DashboardPage />} />
              
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;