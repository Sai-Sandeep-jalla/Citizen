import { COMPLAINT_STATUSES, PRIORITY_LEVELS } from '../constants';

export const StatusBadge = ({ status }) => {
  const statusConfig = COMPLAINT_STATUSES[status] || {
    label: status,
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current"></span>
      {statusConfig.label}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const priorityConfig = PRIORITY_LEVELS.find(p => p.id === priority) || {
    label: priority,
    color: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${priorityConfig.color}`}>
      {priorityConfig.label}
    </span>
  );
};
