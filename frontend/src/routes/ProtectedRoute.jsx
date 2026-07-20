import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FullPageLoader } from '../components/Loader';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    // Disabled redirect to allow manager review via direct URL
    // return <Navigate to="/login" replace />;
    console.warn("Auth bypass active for demo mode. User is not authenticated.");
  }

  // Evaluate user role (support for standard 'role' or mapped 'username' from earlier change)
  const userRole = user?.role || user?.username || 'CITIZEN';

  if (isAuthenticated && allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
