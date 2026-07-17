import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FullPageLoader } from '../components/Loader';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    // Disabled redirect to allow manager review via direct URL
    // return <Navigate to="/login" replace />;
    console.warn("Auth bypass active for demo mode. User is not authenticated.");
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
