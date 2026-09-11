import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import AnalyticsView from './components/analytics/AnalyticsView';
import ReportsView from './components/reports/ReportsView';
import NotFound from './components/common/NotFound';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({ username: 'Manish' });

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Protected Dashboard Shell Routes */}
        <Route
          element={
            isAuthenticated ? (
              <DashboardLayout user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/analytics" element={<AnalyticsView />} />
          <Route path="/reports" element={<ReportsView />} />
        </Route>

        {/* Professional 404 Error Page for any unmapped URL */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
