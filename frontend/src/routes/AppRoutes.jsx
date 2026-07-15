import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';
import { Loader } from '../components/Loader';

// Lazy loading pages for optimized performance code splitting
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const ComplaintRegistration = lazy(() => import('../pages/ComplaintRegistration'));
const ComplaintTracking = lazy(() => import('../pages/ComplaintTracking'));
const ComplaintHistory = lazy(() => import('../pages/ComplaintHistory'));
const Feedback = lazy(() => import('../pages/Feedback'));
const Settings = lazy(() => import('../pages/Settings'));

const PageFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader message="Loading layout view..." />
  </div>
);

// Standalone elegant 404 Page Not Found Component
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h2 className="text-4xl font-extrabold text-primary">404</h2>
      <div className="space-y-1.5">
        <h4 className="text-lg font-bold text-gray-800">Page Not Found</h4>
        <p className="text-sm text-gray-500 max-w-sm">The resource you requested is unavailable or has been relocated.</p>
      </div>
      <Navigate to="/dashboard" replace />
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Public Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/complaint/register"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ComplaintRegistration />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/complaint/track"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ComplaintTracking />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/complaint/history"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ComplaintHistory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Feedback />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Home redirects to Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Fallback Catch All */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <NotFound />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
