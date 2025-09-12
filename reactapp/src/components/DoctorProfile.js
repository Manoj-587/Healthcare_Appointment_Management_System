import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doctorAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    specialization: '',
    phoneNumber: '',
    qualifications: '',
    clinicName: '',
    contactInfo: ''
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
      const response = await doctorAPI.getProfile();
      setProfile({
        name: response.data.user.name,
        email: response.data.user.email,
        specialization: response.data.specialization || '',
        phoneNumber: response.data.phoneNumber || '',
        qualifications: response.data.qualifications || '',
        clinicName: response.data.clinicName || '',
        contactInfo: response.data.contactInfo || ''
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
      await doctorAPI.updateProfile(profile);
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
        <button onClick={() => navigate('/doctor/dashboard')} className="back-btn">
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
              <label>Specialization:</label>
              <input
                type="text"
                name="specialization"
                value={profile.specialization}
                onChange={handleChange}
                required
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
              <label>Qualifications:</label>
              <textarea
                name="qualifications"
                value={profile.qualifications}
                onChange={handleChange}
                rows="3"
                placeholder="e.g., MBBS, MD Cardiology"
              />
            </div>

            <div className="form-group">
              <label>Clinic Name:</label>
              <input
                type="text"
                name="clinicName"
                value={profile.clinicName}
                onChange={handleChange}
                placeholder="Your clinic or hospital name"
              />
            </div>

            <div className="form-group">
              <label>Contact Information:</label>
              <textarea
                name="contactInfo"
                value={profile.contactInfo}
                onChange={handleChange}
                rows="2"
                placeholder="Additional contact details"
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

export default DoctorProfile;