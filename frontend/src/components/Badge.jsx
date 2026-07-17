import { COMPLAINT_STATUSES, PRIORITY_LEVELS } from '../constants';
import { useLanguage } from '../hooks/useLanguage';

export const StatusBadge = ({ status }) => {
  const { t } = useLanguage();
  const statusConfig = COMPLAINT_STATUSES[status] || {
    label: status,
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const translateStatus = (str) => {
    const mapping = {
      'PENDING': 'pending',
      'ASSIGNED': 'assigned',
      'IN_PROGRESS': 'inProgress',
      'RESOLVED': 'resolved',
      'CLOSED': 'closed',
      'REJECTED': 'rejected'
    };
    return t(mapping[str.toUpperCase()] || str.toLowerCase());
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current"></span>
      {translateStatus(status)}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const { t } = useLanguage();
  const priorityConfig = PRIORITY_LEVELS.find(p => p.id === priority) || {
    label: priority,
    color: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${priorityConfig.color}`}>
      {t(priority.toLowerCase()) || priorityConfig.label}
    </span>
  );
};

