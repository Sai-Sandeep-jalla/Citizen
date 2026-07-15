export const COMPLAINT_CATEGORIES = [
  { id: 'schools', label: 'Schools', icon: 'GraduationCap' },
  { id: 'village', label: 'Village', icon: 'Home' },
  { id: 'revenue', label: 'Revenue', icon: 'Coins' },
  { id: 'housing', label: 'Housing', icon: 'Building' },
  { id: 'land', label: 'Land', icon: 'Map' },
  { id: 'others', label: 'Others', icon: 'HelpCircle' }
];

export const PRIORITY_LEVELS = [
  { id: 'LOW', label: 'Low', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: 'MEDIUM', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  { id: 'HIGH', label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  { id: 'CRITICAL', label: 'Critical', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
];

export const COMPLAINT_STATUSES = {
  PENDING: { label: 'Pending', color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700' },
  ASSIGNED: { label: 'Assigned', color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800' },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-300 dark:border-yellow-800' },
  RESOLVED: { label: 'Resolved', color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800' },
  CLOSED: { label: 'Closed', color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800' },
  REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800' }
};

export const STATES_AND_DISTRICTS = {
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Noida', 'Ghaziabad', 'Agra', 'Varanasi'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar']
};

export const INDIAN_STATES = Object.keys(STATES_AND_DISTRICTS);

export const ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Swachh Bharat Cleanliness Drive 2026',
    content: 'Join the city-wide cleanliness drive starting this weekend. Clean neighborhood, clean nation.',
    date: '2026-07-14',
    category: 'Campaign'
  },
  {
    id: 2,
    title: 'Monsoon Preparedness & Help Lines',
    content: 'Control room contacts have been set up for waterlogging and power cuts. Call 1912 for emergencies.',
    date: '2026-07-12',
    category: 'Emergency'
  },
  {
    id: 3,
    title: 'New Digital Ration Cards Online',
    content: 'Citizens can now apply or renew their digital ration cards directly through the Citizen Portal scheme section.',
    date: '2026-07-10',
    category: 'Schemes'
  }
];
