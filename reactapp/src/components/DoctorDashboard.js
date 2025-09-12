import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { appointmentAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getDoctorAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAppointment = async (appointmentId) => {
    try {
      await appointmentAPI.approve(appointmentId);
      fetchAppointments();
    } catch (error) {
      alert('Error approving appointment');
    }
  };

  const handleRejectAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to reject this appointment?')) {
      try {
        await appointmentAPI.reject(appointmentId);
        fetchAppointments();
      } catch (error) {
        alert('Error rejecting appointment');
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

  const pendingAppointments = appointments.filter(apt => apt.status === 'PENDING');
  const upcomingAppointments = appointments.filter(apt => apt.status === 'APPROVED');

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <div className="user-info">
          <span>Welcome, Dr. {user?.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-actions">
          <button 
            onClick={() => navigate('/doctor/profile')}
            className="primary-btn"
          >
            Manage Profile
          </button>
          <button 
            onClick={() => navigate('/doctor/availability')}
            className="secondary-btn"
          >
            Set Availability
          </button>
        </div>

        <div className="appointments-section">
          <h2>Appointment Requests ({pendingAppointments.length})</h2>
          
          {loading ? (
            <p>Loading appointments...</p>
          ) : pendingAppointments.length === 0 ? (
            <p>No pending appointment requests.</p>
          ) : (
            <div className="appointments-list">
              {pendingAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card pending">
                  <div className="appointment-header">
                    <h3>{appointment.patient.user.name}</h3>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(appointment.status) }}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="appointment-details">
                    <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                    <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                    {appointment.reason && (
                      <p><strong>Reason:</strong> {appointment.reason}</p>
                    )}
                  </div>
                  
                  <div className="appointment-actions">
                    <button 
                      onClick={() => handleApproveAppointment(appointment.id)}
                      className="approve-btn"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleRejectAppointment(appointment.id)}
                      className="reject-btn"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="appointments-section">
          <h2>Upcoming Appointments ({upcomingAppointments.length})</h2>
          
          {upcomingAppointments.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            <div className="appointments-list">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card approved">
                  <div className="appointment-header">
                    <h3>{appointment.patient.user.name}</h3>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(appointment.status) }}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="appointment-details">
                    <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                    <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                    {appointment.reason && (
                      <p><strong>Reason:</strong> {appointment.reason}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;