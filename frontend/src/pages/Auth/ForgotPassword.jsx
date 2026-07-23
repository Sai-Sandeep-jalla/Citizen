/**
 * @file ForgotPassword.jsx
 * @description Page component for OTP-based password recovery.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { Input, Dropdown } from '../../components/FormControls';
import { Button } from '../../components/Button';
import toast from 'react-hot-toast';
import { ShieldCheck, Eye, EyeOff, LockReset } from 'lucide-react';
import { api } from '../../services/api';

export const ForgotPassword = () => {
  const { requestOtp } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('IDENTIFIER'); // 'IDENTIFIER' | 'RESET'
  const [identifier, setIdentifier] = useState('');
  const [role, setRole] = useState('Citizen');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerId,
    handleSubmit: handleIdSubmit,
    formState: { errors: idErrors }
  } = useForm({
    defaultValues: { emailOrMobile: '', role: '' }
  });

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
    watch
  } = useForm({
    defaultValues: { otp: '', newPassword: '', confirmPassword: '' }
  });

  // Helper to determine if input is email or mobile
  const isEmailInput = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input || '');

  const onIdentifierSubmit = async (data) => {
    setLoading(true);
    try {
      setIdentifier(data.emailOrMobile);
      setRole(data.role);

      const isEmail = isEmailInput(data.emailOrMobile);
      const otpPayload = isEmail 
        ? { email: data.emailOrMobile, role: data.role }
        : { mobileNumber: data.emailOrMobile, role: data.role };

      const res = await requestOtp(otpPayload);
      
      if (res?.message) toast.success(res.message);
      setStep('RESET');
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.message;
      if (backendMessage) toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  const onResetSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const isEmail = isEmailInput(identifier);
      const resetPayload = isEmail
        ? { email: identifier, otp: data.otp, newPassword: data.newPassword, role }
        : { mobileNumber: identifier, otp: data.otp, newPassword: data.newPassword, role };

      const res = await api.resetPassword(resetPayload);
      
      if (res?.message) toast.success(res.message);
      navigate('/login');
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.message;
      if (backendMessage) toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const isEmail = isEmailInput(identifier);
      const otpPayload = isEmail 
        ? { email: identifier, role }
        : { mobileNumber: identifier, role };

      const res = await requestOtp(otpPayload);
      if (res?.message) toast.success(res.message);
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.message;
      if (backendMessage) toast.error(backendMessage);
    }
  };

  if (step === 'RESET') {
    const isEmail = isEmailInput(identifier);

    return (
      <form onSubmit={handleResetSubmit(onResetSubmit)} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-6 space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
            <LockReset className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-[#0B1E47] tracking-tight">{t('createNewPassword')}</h3>
          <p className="text-xs text-gray-500 font-medium max-w-[280px] mx-auto leading-relaxed">
            Please enter the 6-digit code sent to your {isEmail ? 'email address' : 'mobile number'}<br/>
            <span className="font-bold text-gray-800">{identifier}</span>
          </p>
        </div>

        <Input
          label={t('resetCodeOtp')}
          name="otp"
          type="text"
          placeholder={t('enterOtp')}
          error={resetErrors.otp}
          {...registerReset('otp', { required: 'OTP is required', minLength: { value: 4, message: 'Invalid OTP length' } })}
        />

        <div className="relative">
          <Input
            label={t('newPassword')}
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            error={resetErrors.newPassword}
            {...registerReset('newPassword', { 
              required: 'New Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8.5 text-gray-400 hover:text-gray-650"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <Input
          label={t('confirmNewPassword')}
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          error={resetErrors.confirmPassword}
          {...registerReset('confirmPassword', { required: 'Please confirm your new password' })}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
          isLoading={loading}
        >
          {t('resetPasswordButton')}
        </Button>

        <div className="flex flex-col items-center justify-center space-y-3 pt-4 border-t border-gray-100">
          <button 
            type="button" 
            onClick={handleResendOtp}
            className="text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors"
          >
            {t('resendCode')}
          </button>
          
          <button 
            type="button" 
            onClick={() => setStep('IDENTIFIER')}
            className="text-[11px] font-bold text-blue-600 hover:underline uppercase tracking-wider"
          >
            {t('changeEmailMobile')}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleIdSubmit(onIdentifierSubmit)} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6 space-y-2">
        <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black text-[#0B1E47] tracking-tight">{t('forgotPasswordTitle')}</h3>
        <p className="text-xs text-gray-500 font-medium max-w-[280px] mx-auto leading-relaxed">
          {t('forgotPasswordDesc')}
        </p>
      </div>

      <Dropdown
        label={t('selectRole')}
        name="role"
        emptyOption={t('selectAnOption')}
        options={[
          { value: 'Citizen', label: t('citizen') },
          { value: 'Dept', label: t('dept') },
          { value: 'Admin', label: t('admin') }
        ]}
        error={idErrors.role}
        {...registerId('role', { required: 'Role is required' })}
      />

      <Input
        label={t('emailOrMobile')}
        name="emailOrMobile"
        type="text"
        placeholder={t('enterEmailOrMobile')}
        error={idErrors.emailOrMobile}
        {...registerId('emailOrMobile', { 
          required: 'Email or Mobile is required'
        })}
      />

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
        isLoading={loading}
      >
        {t('sendResetCode')}
      </Button>

      <div className="text-center text-xs text-gray-500 font-semibold pt-4 border-t border-gray-100 dark:border-gray-700">
        {t('rememberPassword')}{' '}
        <Link to="/login" className="text-primary hover:underline font-bold">
          {t('signInHere')}
        </Link>
      </div>
    </form>
  );
};
export default ForgotPassword;
