import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doctorAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const DoctorAvailability = () => {
  const [availability, setAvailability] = useState({
    MONDAY: '',
    TUESDAY: '',
    WEDNESDAY: '',
    THURSDAY: '',
    FRIDAY: '',
    SATURDAY: '',
    SUNDAY: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const daysOfWeek = [
    'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 
    'FRIDAY', 'SATURDAY', 'SUNDAY'
  ];

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await doctorAPI.getProfile();
      if (response.data.dailyAvailability) {
        setAvailability({
          ...availability,
          ...response.data.dailyAvailability
        });
      }
    } catch (error) {
      setError('Error loading availability');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (day, value) => {
    setAvailability({
      ...availability,
      [day]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await doctorAPI.updateAvailability(availability);
      setSuccess('Availability updated successfully!');
    } catch (error) {
      setError('Error updating availability');
    } finally {
      setSaving(false);
    }
  };

  const formatDayName = (day) => {
    return day.charAt(0) + day.slice(1).toLowerCase();
  };

  if (loading) {
    return <div className="loading">Loading availability...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Set Availability</h1>
        <button onClick={() => navigate('/doctor/dashboard')} className="back-btn">
          Back to Dashboard
        </button>
      </header>

      <div className="dashboard-content">
        <div className="availability-form-container">
          <div className="availability-info">
            <h3>Set Your Weekly Availability</h3>
            <p>Enter your available time slots for each day. Use format: "09:00-12:00,14:00-17:00" for multiple slots or leave empty for unavailable days.</p>
          </div>

          <form onSubmit={handleSubmit} className="availability-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="availability-grid">
              {daysOfWeek.map((day) => (
                <div key={day} className="availability-day">
                  <label>{formatDayName(day)}:</label>
                  <input
                    type="text"
                    value={availability[day]}
                    onChange={(e) => handleChange(day, e.target.value)}
                    placeholder="e.g., 09:00-17:00 or 09:00-12:00,14:00-17:00"
                  />
                </div>
              ))}
            </div>

            <div className="availability-examples">
              <h4>Examples:</h4>
              <ul>
                <li><strong>Full day:</strong> 09:00-17:00</li>
                <li><strong>Split schedule:</strong> 09:00-12:00,14:00-17:00</li>
                <li><strong>Half day:</strong> 09:00-13:00</li>
                <li><strong>Not available:</strong> Leave empty</li>
              </ul>
            </div>

            <button type="submit" disabled={saving} className="primary-btn">
              {saving ? 'Saving...' : 'Update Availability'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;