import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { patientAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const PatientProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    emergencyContact: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await patientAPI.getProfile();
      setProfile({
        name: response.data.user.name,
        email: response.data.user.email,
        phoneNumber: response.data.phoneNumber || '',
        address: response.data.address || '',
        dateOfBirth: response.data.dateOfBirth || '',
        emergencyContact: response.data.emergencyContact || ''
      });
    } catch (error) {
      setError('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await patientAPI.updateProfile(profile);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Manage Profile</h1>
        <button onClick={() => navigate('/patient/dashboard')} className="back-btn">
          Back to Dashboard
        </button>
      </header>

      <div className="dashboard-content">
        <div className="profile-form-container">
          <form onSubmit={handleSubmit} className="profile-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                disabled
              />
            </div>

            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                placeholder="10-digit phone number"
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                rows="3"
                placeholder="Your complete address"
              />
            </div>

            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={profile.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Emergency Contact:</label>
              <input
                type="text"
                name="emergencyContact"
                value={profile.emergencyContact}
                onChange={handleChange}
                placeholder="Emergency contact name and phone"
              />
            </div>

            <button type="submit" disabled={saving} className="primary-btn">
              {saving ? 'Saving...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;