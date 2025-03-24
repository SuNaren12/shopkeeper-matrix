
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminPage = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  
  // If not authenticated, redirect to auth page
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // If authenticated but not admin, redirect to home page
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <AdminDashboard />;
};

export default AdminPage;
