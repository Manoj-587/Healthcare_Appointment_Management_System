import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { appointmentAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getPatientAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentAPI.cancel(appointmentId);
        fetchAppointments();
      } catch (error) {
        alert('Error cancelling appointment');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#ffa500';
      case 'APPROVED': return '#28a745';
      case 'REJECTED': return '#dc3545';
      case 'COMPLETED': return '#6c757d';
      case 'CANCELLED': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Patient Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-actions">
          <button 
            onClick={() => navigate('/patient/book-appointment')}
            className="primary-btn"
          >
            Book New Appointment
          </button>
          <button 
            onClick={() => navigate('/patient/profile')}
            className="secondary-btn"
          >
            Manage Profile
          </button>
        </div>

        <div className="appointments-section">
          <h2>My Appointments</h2>
          
          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p>No appointments found. Book your first appointment!</p>
          ) : (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <h3>Dr. {appointment.doctor.user.name}</h3>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(appointment.status) }}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="appointment-details">
                    <p><strong>Specialization:</strong> {appointment.doctor.specialization}</p>
                    <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                    <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                    {appointment.reason && (
                      <p><strong>Reason:</strong> {appointment.reason}</p>
                    )}
                  </div>
                  
                  {(appointment.status === 'PENDING' || appointment.status === 'APPROVED') && (
                    <button 
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="cancel-btn"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;