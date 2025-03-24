
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForms from '@/components/auth/AuthForms';
import { useAuth } from '@/context/AuthContext';

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-medium text-center mb-8 animate-fade-in">
              Account
            </h1>
            <div className="bg-white rounded-lg shadow-sm border p-8 animate-scale">
              <AuthForms />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
