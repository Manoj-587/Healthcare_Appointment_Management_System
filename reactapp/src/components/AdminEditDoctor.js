import React, { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    qualifications: '',
    phoneNumber: '',
    clinicName: '',
    contactInfo: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const response = await adminAPI.getAllDoctors();
      const doctor = response.data.find(d => d.id === parseInt(id));
      
      if (doctor) {
        setFormData({
          name: doctor.user.name,
          email: doctor.user.email,
          specialization: doctor.specialization,
          qualifications: doctor.qualifications || '',
          phoneNumber: doctor.phoneNumber || '',
          clinicName: doctor.clinicName || '',
          contactInfo: doctor.contactInfo || ''
        });
      } else {
        setError('Doctor not found');
      }
    } catch (error) {
      setError('Error loading doctor data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await adminAPI.updateDoctor(id, formData);
      setSuccess('Doctor updated successfully!');
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (error) {
      setError('Error updating doctor. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading doctor data...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Edit Doctor</h1>
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
                disabled
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

            <button type="submit" disabled={saving} className="primary-btn">
              {saving ? 'Updating...' : 'Update Doctor'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditDoctor;