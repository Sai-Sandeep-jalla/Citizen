import { Loader2 } from 'lucide-react';

export const Loader = ({ message = 'Loading, please wait...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-6 text-center space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <p className="text-sm font-medium text-gray-500">{message}</p>
    </div>
  );
};

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center space-y-3 max-w-xs border border-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Citizen Portal</span>
        <span className="text-sm text-gray-700">Verifying session...</span>
      </div>
    </div>
  );
};

// Shimmer card skeletons
export const SkeletonCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 animate-pulse flex items-center justify-between">
      <div className="space-y-3 w-2/3">
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
    </div>
  );
};

// Custom skeleton for dashboard screen
export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-1/6 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-5 h-64 animate-pulse col-span-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-full bg-gray-150 rounded"></div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 h-64 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-10 bg-gray-100 rounded"></div>
            <div className="h-10 bg-gray-100 rounded"></div>
            <div className="h-10 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
