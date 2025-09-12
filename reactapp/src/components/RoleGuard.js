import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleGuard = ({ children, allowedRoles, redirectTo = '/' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="unauthorized">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <p>Your role: {user.role}</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return children;
};

export default RoleGuard;