/**
 * @file Dashboard.jsx
 * @description Role-based router for the Dashboard, directing users to their specific dashboard views.
 */

import { useAuth } from '../hooks/useAuth';
import CitizenDashboard from './CitizenDashboard';
import OfficerDashboard from './OfficerDashboard/OfficerDashboard';


export const Dashboard = () => {
  const { user } = useAuth();

  const userRole = user?.role || user?.username || 'CITIZEN';

  if (userRole.toUpperCase() === 'OFFICER' || userRole.toUpperCase() === 'ADMIN' || userRole.toUpperCase() === 'DEPT') {
    return <OfficerDashboard />;
  }

  // Default to Citizen Dashboard
  return <CitizenDashboard />;
};

export default Dashboard;
