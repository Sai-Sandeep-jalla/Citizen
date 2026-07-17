import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { Mail, Phone, MapPin, Calendar, User, Briefcase, ShieldCheck } from 'lucide-react';

export const MyProfile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start space-x-4">
      <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600 rounded-xl shadow-inner border border-blue-100/50">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-sm font-bold text-gray-800 break-words leading-tight">
          {value || <span className="text-gray-300 italic font-medium">Not Provided</span>}
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-[#0B1E47] tracking-tight">{t('myProfile') || 'My Profile'}</h1>
        <p className="text-sm text-gray-500 mt-2 font-semibold">Your comprehensive digital citizen identity and records.</p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden relative">
        {/* Abstract Cover Background */}
        <div className="h-40 sm:h-56 w-full bg-gradient-to-r from-[#0B1E47] via-[#1D4ED8] to-[#F97316] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        </div>
        
        <div className="px-6 sm:px-12 pb-8 relative bg-white">
          {/* Avatar floating */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-20 sm:-mt-24 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-sm">
                  <User className="w-8 h-8 text-white opacity-80" />
                </div>
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || ' ')}&background=F97316&color=fff&size=256`}
                  alt="avatar"
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover ring-[10px] ring-white shadow-2xl bg-white relative z-10"
                />
                <div className="absolute bottom-3 right-3 bg-green-500 border-4 border-white w-7 h-7 rounded-full z-30 shadow-lg" title="Verified Account"></div>
              </div>
              
              <div className="text-center sm:text-left mb-3">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{user?.name || 'Citizen User'}</h2>
                <div className="flex items-center justify-center sm:justify-start space-x-3 mt-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold rounded-full shadow-md">
                    {user?.role || 'CITIZEN'}
                  </span>
                  <span className="text-sm font-bold text-gray-500 flex items-center bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                    <MapPin className="w-4 h-4 mr-1.5 text-orange-500" />
                    {user?.district || 'Unknown District'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex mt-6 sm:mt-0 mb-4 bg-gradient-to-br from-green-50 to-emerald-50/30 px-6 py-4 rounded-2xl border border-green-100 items-center space-x-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <ShieldCheck className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account Status</p>
                <p className="text-sm font-black text-green-700">Verified & Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Column 1 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Contact Identity</h3>
          </div>
          <InfoCard icon={Mail} label="Email Address" value={user?.email} />
          <InfoCard icon={Phone} label="Mobile Number" value={user?.mobile} />
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Demographics</h3>
          </div>
          <InfoCard icon={User} label="Gender" value={user?.gender} />
          <InfoCard icon={Calendar} label="Date of Birth" value={user?.dob} />
          {user?.role === 'OFFICER' && (
             <InfoCard icon={Briefcase} label="Department" value={user?.department} />
          )}
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Location & Compliance</h3>
          </div>
          <InfoCard 
            icon={MapPin} 
            label="Full Address" 
            value={
              [user?.address, user?.district, user?.state, user?.pincode]
                .filter(Boolean)
                .join(', ') || null
            } 
          />
          <InfoCard 
            icon={ShieldCheck} 
            label="Aadhar / Identity Proof" 
            value={user?.aadhar ? 'XXXX-XXXX-' + user.aadhar.slice(-4) : null} 
          />
        </div>
        
      </div>
    </div>
  );
};
export default MyProfile;
