import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { adminAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, appointmentsResponse, doctorsResponse] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllAppointments(),
        adminAPI.getAllDoctors()
      ]);
      
      setStats(statsResponse.data);
      setAppointments(appointmentsResponse.data);
      setDoctors(doctorsResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'doctors' ? 'active' : ''}
            onClick={() => setActiveTab('doctors')}
          >
            Doctors
          </button>
          <button 
            className={activeTab === 'appointments' ? 'active' : ''}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Doctors</h3>
                <p className="stat-number">{stats.totalDoctors}</p>
              </div>
              <div className="stat-card">
                <h3>Total Patients</h3>
                <p className="stat-number">{stats.totalPatients}</p>
              </div>
              <div className="stat-card">
                <h3>Total Appointments</h3>
                <p className="stat-number">{stats.totalAppointments}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Requests</h3>
                <p className="stat-number">{stats.pendingAppointments}</p>
              </div>
            </div>

            <div className="appointment-stats">
              <h3>Appointment Status Breakdown</h3>
              <div className="status-grid">
                <div className="status-item">
                  <span className="status-label">Pending:</span>
                  <span className="status-count">{stats.pendingAppointments}</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Approved:</span>
                  <span className="status-count">{stats.approvedAppointments}</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Rejected:</span>
                  <span className="status-count">{stats.rejectedAppointments}</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Completed:</span>
                  <span className="status-count">{stats.completedAppointments}</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Cancelled:</span>
                  <span className="status-count">{stats.cancelledAppointments}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="doctors-section">
            <div className="section-header">
              <h2>Doctor Management</h2>
              <button 
                onClick={() => navigate('/admin/create-doctor')}
                className="primary-btn"
              >
                Add New Doctor
              </button>
            </div>

            <div className="doctors-list">
              {doctors.map(doctor => (
                <div key={doctor.id} className="doctor-card">
                  <h3>Dr. {doctor.user.name}</h3>
                  <p><strong>Email:</strong> {doctor.user.email}</p>
                  <p><strong>Specialization:</strong> {doctor.specialization}</p>
                  <p><strong>Qualifications:</strong> {doctor.qualifications}</p>
                  {doctor.clinicName && (
                    <p><strong>Clinic:</strong> {doctor.clinicName}</p>
                  )}
                  <button 
                    onClick={() => navigate(`/admin/edit-doctor/${doctor.id}`)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="appointments-section">
            <h2>All Appointments ({appointments.length})</h2>
            
            <div className="appointments-list">
              {appointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <h3>
                      {appointment.patient.user.name} → Dr. {appointment.doctor.user.name}
                    </h3>
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
                    <p><strong>Specialization:</strong> {appointment.doctor.specialization}</p>
                    {appointment.reason && (
                      <p><strong>Reason:</strong> {appointment.reason}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;