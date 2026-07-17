import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { Card } from '../components/Card';
import { Input, Dropdown } from '../components/FormControls';
import { Button } from '../components/Button';
import { useMetadata } from '../hooks/useMetadata';
import toast from 'react-hot-toast';
import { User, Key, Bell } from 'lucide-react';

export const Settings = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const { metadata } = useMetadata();
  const INDIAN_STATES = metadata?.INDIAN_STATES || [];
  const STATES_AND_DISTRICTS = metadata?.STATES_AND_DISTRICTS || {};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      state: user?.state || '',
      district: user?.district || '',
      pincode: user?.pincode || '',
      department: user?.department || ''
    }
  });

  const watchedState = watch('state');
  const districts = watchedState ? STATES_AND_DISTRICTS[watchedState] || [] : [];

  const onSubmitProfile = async (data) => {
    setLoading(true);
    try {
      await updateProfile(data);
      toast.success('Profile details updated successfully!');
    } catch {
      toast.error('Failed to update profile details.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitPassword = (e) => {
    e.preventDefault();
    toast.success('Password update simulated successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Title Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-[#0B1E47] tracking-tight">{t('settings')}</h1>
        <p className="text-sm text-gray-500 mt-2 font-semibold">Manage your citizen profile parameters, local preferences, and communication alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Side: Tabs Navigation */}
        <div className="md:col-span-1">
          <Card hoverEffect={false} className="p-4 space-y-2 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40">

            <button
              onClick={() => setActiveTab('profile')}
              className={`
                w-full text-left px-4 py-3 text-sm font-bold rounded-xl flex items-center space-x-3 transition-all duration-300
                ${activeTab === 'profile' ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md transform scale-[1.02]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <User className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
            
            <button
              onClick={() => setActiveTab('notifications')}
              className={`
                w-full text-left px-4 py-3 text-sm font-bold rounded-xl flex items-center space-x-3 transition-all duration-300
                ${activeTab === 'notifications' ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md transform scale-[1.02]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
          </Card>
        </div>

        {/* Right Side: Tab Panel Content */}
        <div className="md:col-span-3">
          
          {activeTab === 'profile' && (
            <Card hoverEffect={false} className="rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 p-2 sm:p-4">
              <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-6">
                <div className="flex items-center space-x-3 border-b-2 border-gray-100 pb-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
                    Edit Profile Details
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-4 border-b border-gray-50">
                  <div className="relative group">
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || ' ')}&background=F97316&color=fff&size=128`}
                      alt="avatar preview"
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50 shadow-md transition-all duration-300 group-hover:ring-blue-100"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-800 mb-1.5">Profile Picture</h4>
                    <p className="text-[11px] font-medium text-gray-400 mb-3">JPG, GIF or PNG. Max size of 800K</p>
                    <button 
                      type="button" 
                      onClick={() => toast('Photo upload coming soon!', { icon: '📸' })}
                      className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
                    >
                      Upload New Picture
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <Input
                    label="Full Name"
                    name="name"
                    error={errors.name}
                    {...register('name', { required: 'Name is required' })}
                  />
                  
                  <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                    <div className="flex-1">
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        error={errors.email}
                        {...register('email', { required: 'Email is required' })}
                      />
                    </div>
                    <button 
                      type="button" 
                      disabled={emailVerified}
                      onClick={() => {
                        toast.success('Verification link sent to your email!');
                        setEmailVerified(true);
                      }}
                      className={`
                        mt-1 sm:mt-0 w-full sm:w-auto px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 mb-[1px] shadow-sm
                        ${emailVerified ? 'bg-green-50 text-green-700 border border-green-200 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-md hover:from-orange-600 hover:to-orange-700 active:scale-95'}
                      `}
                    >
                      {emailVerified ? '✓ Verified' : 'Verify Email'}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                    <div className="flex-1">
                      <Input
                        label="Mobile Number"
                        name="mobile"
                        error={errors.mobile}
                        {...register('mobile', { required: 'Mobile is required' })}
                      />
                    </div>
                    <button 
                      type="button" 
                      disabled={phoneVerified}
                      onClick={() => {
                        toast.success('OTP sent to your mobile number!');
                        setPhoneVerified(true);
                      }}
                      className={`
                        mt-1 sm:mt-0 w-full sm:w-auto px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 mb-[1px] shadow-sm
                        ${phoneVerified ? 'bg-green-50 text-green-700 border border-green-200 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-md hover:from-orange-600 hover:to-orange-700 active:scale-95'}
                      `}
                    >
                      {phoneVerified ? '✓ Verified' : 'Verify Phone'}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-700 to-[#0B1E47] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            </Card>
          )}



          {activeTab === 'notifications' && (
            <Card hoverEffect={false} className="rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 p-2 sm:p-4 space-y-6">
              <div className="flex items-center space-x-3 border-b-2 border-gray-100 pb-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
                  Notification Preferences
                </h3>
              </div>

              <div className="space-y-5">
                <div className="flex items-start justify-between pb-4 border-b border-gray-50 group hover:bg-gray-50/50 p-2 rounded-xl transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-900">Email Alerts</p>
                    <p className="text-xs font-medium text-gray-500">Receive email notification when your complaint changes stage.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-600 h-5 w-5 cursor-pointer mt-1 transition-all" />
                </div>

                <div className="flex items-start justify-between pb-4 border-b border-gray-50 group hover:bg-gray-50/50 p-2 rounded-xl transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-900">SMS Alerts</p>
                    <p className="text-xs font-medium text-gray-500">Receive instant text updates on your registered mobile number.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-600 h-5 w-5 cursor-pointer mt-1 transition-all" />
                </div>

                <div className="flex items-start justify-between group hover:bg-gray-50/50 p-2 rounded-xl transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-900">Government Scheme Announcements</p>
                    <p className="text-xs font-medium text-gray-500">Receive alerts when new schemes are rolled out in your district.</p>
                  </div>
                  <input type="checkbox" className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-600 h-5 w-5 cursor-pointer mt-1 transition-all" />
                </div>
              </div>
            </Card>
          )}

        </div>

      </div>

    </div>
  );
};
export default Settings;
