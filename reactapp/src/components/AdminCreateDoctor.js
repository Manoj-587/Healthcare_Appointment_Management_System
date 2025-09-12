import React, { useState } from 'react';
import { adminAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AdminCreateDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    qualifications: '',
    phoneNumber: '',
    clinicName: '',
    contactInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await adminAPI.createDoctor(formData);
      setSuccess('Doctor created successfully!');
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (error) {
      setError('Error creating doctor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Add New Doctor</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
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
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label>Specialization:</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Qualifications:</label>
              <textarea
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                rows="2"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Clinic Name:</label>
              <input
                type="text"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Contact Info:</label>
              <textarea
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                rows="2"
              />
            </div>

            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? 'Creating...' : 'Create Doctor'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateDoctor;