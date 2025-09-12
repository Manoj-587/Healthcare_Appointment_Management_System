import React from 'react';
import { Link } from 'react-router-dom';

const RoleSelection = () => {
  return (
    <div className="role-selection-container">
      <div className="role-selection-form">
        <h2>Healthcare Management System</h2>
        <h3>Choose Your Role</h3>
        
        <div className="role-options">
          <div className="role-card">
            <h4>Patient</h4>
            <p>Book appointments and manage your healthcare</p>
            <Link to="/register/patient" className="role-button">
              Register as Patient
            </Link>
          </div>
          
          <div className="role-card">
            <h4>Doctor</h4>
            <p>Manage appointments and patient care</p>
            <Link to="/register/doctor" className="role-button">
              Register as Doctor
            </Link>
          </div>
        </div>
        
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;