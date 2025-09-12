import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Healthcare Management System</h1>
        <p>Choose your role to continue</p>
        
        <div className="role-cards">
          <div className="role-card">
            <h3>Patient</h3>
            <p>Book appointments and manage your healthcare</p>
            <div className="role-actions">
              <Link to="/patient/login" className="role-button primary">Login</Link>
              <Link to="/patient/register" className="role-button secondary">Register</Link>
            </div>
          </div>
          
          <div className="role-card">
            <h3>Doctor</h3>
            <p>Manage appointments and patient care</p>
            <div className="role-actions">
              <Link to="/doctor/login" className="role-button primary">Login</Link>
              <Link to="/doctor/register" className="role-button secondary">Register</Link>
            </div>
          </div>
          
          <div className="role-card">
            <h3>Admin</h3>
            <p>System administration and management</p>
            <div className="role-actions">
              <Link to="/admin/login" className="role-button primary">Login</Link>
              <Link to="/admin/register" className="role-button secondary">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;