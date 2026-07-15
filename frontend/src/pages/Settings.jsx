import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { Card } from '../components/Card';
import { Input, Dropdown } from '../components/FormControls';
import { Button } from '../components/Button';
import { INDIAN_STATES, STATES_AND_DISTRICTS } from '../constants';
import toast from 'react-hot-toast';
import { User, Key, Bell } from 'lucide-react';

export const Settings = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

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
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 m-0">{t('settings')}</h1>
        <p className="text-xs text-gray-500 mt-1">Manage your citizen profile parameters, local preferences, security keys, and communication alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Side: Tabs Navigation */}
        <div className="md:col-span-1">
          <Card hoverEffect={false} className="p-3.5 space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`
                w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center space-x-2 transition
                ${activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}
              `}
            >
              <User className="w-4.5 h-4.5" />
              <span>Edit Profile</span>
            </button>
            
            <button
              onClick={() => setActiveTab('security')}
              className={`
                w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center space-x-2 transition
                ${activeTab === 'security' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}
              `}
            >
              <Key className="w-4.5 h-4.5" />
              <span>Security & Pass</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`
                w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center space-x-2 transition
                ${activeTab === 'notifications' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}
              `}
            >
              <Bell className="w-4.5 h-4.5" />
              <span>Notifications</span>
            </button>
          </Card>
        </div>

        {/* Right Side: Tab Panel Content */}
        <div className="md:col-span-3">
          
          {activeTab === 'profile' && (
            <Card hoverEffect={false}>
              <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-5">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-gray-100 pb-1.5 flex items-center space-x-2">
                  <User className="w-4.5 h-4.5" />
                  <span>Personal Details</span>
                </h3>

                <div className="flex items-center space-x-4 pb-2 border-b border-gray-50">
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"}
                    alt="avatar preview"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{user?.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Role: {user?.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    error={errors.name}
                    {...register('name', { required: 'Name is required' })}
                  />
                  <Input
                    label="Mobile Number"
                    name="mobile"
                    error={errors.mobile}
                    {...register('mobile', { required: 'Mobile is required' })}
                  />
                </div>

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  disabled
                  error={errors.email}
                  className="opacity-70 cursor-not-allowed"
                  {...register('email')}
                />

                {user?.role === 'OFFICER' && (
                  <Input
                    label="Department"
                    name="department"
                    disabled
                    className="opacity-70 cursor-not-allowed"
                    {...register('department')}
                  />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Dropdown
                    label="State"
                    name="state"
                    options={INDIAN_STATES.map(s => ({ value: s, label: s }))}
                    emptyOption="Select State"
                    error={errors.state}
                    {...register('state', { required: 'State is required' })}
                  />
                  <Dropdown
                    label="District"
                    name="district"
                    options={districts.map(d => ({ value: d, label: d }))}
                    emptyOption="Select District"
                    disabled={!watchedState}
                    error={errors.district}
                    {...register('district', { required: 'District is required' })}
                  />
                  <Input
                    label="Pincode"
                    name="pincode"
                    error={errors.pincode}
                    {...register('pincode', { required: 'Pincode is required' })}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={loading}
                  >
                    Save Profile Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card hoverEffect={false}>
              <form onSubmit={onSubmitPassword} className="space-y-5">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-gray-100 pb-1.5 flex items-center space-x-2">
                  <Key className="w-4.5 h-4.5" />
                  <span>Update Password</span>
                </h3>

                <Input
                  label="Current Password"
                  name="current_password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="New Password"
                    name="new_password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                  <Input
                    label="Confirm New Password"
                    name="confirm_password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card hoverEffect={false} className="space-y-5">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-gray-100 pb-1.5 flex items-center space-x-2">
                <Bell className="w-4.5 h-4.5" />
                <span>Notification Preferences</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-gray-50">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-gray-800">Email Alerts</p>
                    <p className="text-[11px] text-gray-400">Receive email notification when complaint changes stage.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5 cursor-pointer" />
                </div>

                <div className="flex items-start justify-between pb-3 border-b border-gray-50">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-gray-800">SMS Alerts</p>
                    <p className="text-[11px] text-gray-400">Receive instant updates on your registered mobile number.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5 cursor-pointer" />
                </div>

                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-gray-800">Government Scheme Announcements</p>
                    <p className="text-[11px] text-gray-400">Receive alerts when new schemes are rolled out in your district.</p>
                  </div>
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5 cursor-pointer" />
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
