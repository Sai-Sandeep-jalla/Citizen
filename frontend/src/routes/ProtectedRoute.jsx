import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FullPageLoader } from '../components/Loader';

<<<<<<< HEAD
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
=======
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c

  if (loading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    // Disabled redirect to allow manager review via direct URL
    // return <Navigate to="/login" replace />;
    console.warn("Auth bypass active for demo mode. User is not authenticated.");
  }

<<<<<<< HEAD
  // Evaluate user role (support for standard 'role' or mapped 'username' from earlier change)
  const userRole = user?.role || user?.username || 'CITIZEN';

  if (isAuthenticated && allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

=======
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
