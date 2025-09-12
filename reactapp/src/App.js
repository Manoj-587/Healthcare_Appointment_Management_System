import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import PatientLogin from './components/PatientLogin';
import DoctorLogin from './components/DoctorLogin';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import RegisterDoctor from './components/RegisterDoctor';
import AdminRegister from './components/AdminRegister';
import PatientDashboard from './components/PatientDashboard';
import PatientProfile from './components/PatientProfile';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorProfile from './components/DoctorProfile';
import DoctorAvailability from './components/DoctorAvailability';
import AdminDashboard from './components/AdminDashboard';
import AdminCreateDoctor from './components/AdminCreateDoctor';
import AdminEditDoctor from './components/AdminEditDoctor';
import BookAppointment from './components/BookAppointment';
import RoleGuard from './components/RoleGuard';
import './App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={
        user ? <Navigate to={`/${user.role.toLowerCase()}/dashboard`} /> : <LandingPage />
      } />
      
      {/* Role-specific Login Routes */}
      <Route path="/patient/login" element={
        user ? <Navigate to={`/${user.role.toLowerCase()}/dashboard`} /> : <PatientLogin />
      } />
      <Route path="/doctor/login" element={
        user ? <Navigate to={`/${user.role.toLowerCase()}/dashboard`} /> : <DoctorLogin />
      } />
      <Route path="/admin/login" element={
        user ? <Navigate to={`/${user.role.toLowerCase()}/dashboard`} /> : <AdminLogin />
      } />
      
      {/* Role-specific Registration Routes */}
      <Route path="/patient/register" element={
        user ? <Navigate to={`/${user.role.toLowerCase()}/dashboard`} /> : <Register />
      } />
      <Route path="/doctor/register" element={
        user ? <Navigate to={`/${user.role.toLowerCase()}/dashboard`} /> : <RegisterDoctor />
      } />
      <Route path="/admin/register" element={
        user ? <Navigate to={`/${user.role.toLowerCase()}/dashboard`} /> : <AdminRegister />
      } />
      
      {/* Patient Routes */}
      <Route path="/patient/dashboard" element={
        <RoleGuard allowedRoles={['PATIENT']}>
          <PatientDashboard />
        </RoleGuard>
      } />
      <Route path="/patient/profile" element={
        <RoleGuard allowedRoles={['PATIENT']}>
          <PatientProfile />
        </RoleGuard>
      } />
      <Route path="/patient/book-appointment" element={
        <RoleGuard allowedRoles={['PATIENT']}>
          <BookAppointment />
        </RoleGuard>
      } />
      
      {/* Doctor Routes */}
      <Route path="/doctor/dashboard" element={
        <RoleGuard allowedRoles={['DOCTOR']}>
          <DoctorDashboard />
        </RoleGuard>
      } />
      <Route path="/doctor/profile" element={
        <RoleGuard allowedRoles={['DOCTOR']}>
          <DoctorProfile />
        </RoleGuard>
      } />
      <Route path="/doctor/availability" element={
        <RoleGuard allowedRoles={['DOCTOR']}>
          <DoctorAvailability />
        </RoleGuard>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <RoleGuard allowedRoles={['ADMIN']}>
          <AdminDashboard />
        </RoleGuard>
      } />
      <Route path="/admin/create-doctor" element={
        <RoleGuard allowedRoles={['ADMIN']}>
          <AdminCreateDoctor />
        </RoleGuard>
      } />
      <Route path="/admin/edit-doctor/:id" element={
        <RoleGuard allowedRoles={['ADMIN']}>
          <AdminEditDoctor />
        </RoleGuard>
      } />
      
      {/* Redirect old routes */}
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/register" element={<Navigate to="/" />} />
      
      <Route path="/unauthorized" element={
        <div className="unauthorized">
          <h1>Unauthorized Access</h1>
          <p>You don't have permission to access this page.</p>
        </div>
      } />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;