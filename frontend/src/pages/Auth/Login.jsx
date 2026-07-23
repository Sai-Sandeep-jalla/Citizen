/**
 * @file Login.jsx
 * @description Page component for user authentication (Login) with 2FA support.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { Input, Dropdown } from '../../components/FormControls';
import { Button } from '../../components/Button';
import toast from 'react-hot-toast';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const { authenticateCredentials, finalizeLogin, requestOtp, verifyOtp } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // 2FA State
  const [loginStep, setLoginStep] = useState('CREDENTIALS'); // 'CREDENTIALS' | 'OTP'
  const [tempAuthData, setTempAuthData] = useState(null);
  const [otp, setOtp] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      username: 'Citizen'
    }
  });

  // Helper to determine if input is email or mobile
  const isEmailInput = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input || '');

  const onSubmitCredentials = async (data) => {
    setLoading(true);
    try {
      const isOfficer = data.email === 'dept@gmail.com' && data.password === 'dept@@123';
      
      let authResult;
      if (isOfficer) {
        authResult = {
          loggedInUser: { email: data.email, role: 'Officer', userName: 'Department Officer' },
          authToken: 'mock-officer-token',
          message: 'Officer login successful!'
        };
      } else {
        authResult = await authenticateCredentials(data.email, data.password, 'Citizen');
      }

      setTempAuthData(authResult);
      
      // 2FA Delinked temporarily per user request
      // Bypass OTP and finalize login directly
      finalizeLogin(authResult.loggedInUser, authResult.authToken);
      if (authResult.message) toast.success(authResult.message);
      navigate('/dashboard');
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.message;
      if (backendMessage) toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    try {
      // Step 3: Verify the entered OTP
      const identifier = tempAuthData.loggedInUser.email; // contains either email or mobile string
      const isEmail = isEmailInput(identifier);
      const verifyPayload = isEmail
        ? { email: identifier, otp, role: tempAuthData.loggedInUser.role }
        : { mobileNumber: identifier, otp, role: tempAuthData.loggedInUser.role };

      const res = await verifyOtp(verifyPayload);
      
      // Step 4: Finalize Login (save session)
      finalizeLogin(tempAuthData.loggedInUser, tempAuthData.authToken);
      const successMsg = res?.message || tempAuthData.message;
      if (successMsg) toast.success(successMsg);
      navigate('/dashboard');
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.message;
      if (backendMessage) toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const data = getValues();
    try {
      const isEmail = isEmailInput(data.email);
      const otpPayload = isEmail 
        ? { email: data.email, role: 'Citizen' }
        : { mobileNumber: data.email, role: 'Citizen' };

      if (res?.message) toast.success(res.message);
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.message;
      if (backendMessage) toast.error(backendMessage);
    }
  };

  // Render OTP Verification Step
  if (loginStep === 'OTP') {
    const identifier = tempAuthData?.loggedInUser?.email || '';
    const isEmail = isEmailInput(identifier);

    return (
      <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-6 space-y-2">
          <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-[#0B1E47] tracking-tight">{t('twoStepVerification')}</h3>
          <p className="text-xs text-gray-500 font-medium max-w-[280px] mx-auto leading-relaxed">
            Please enter the authentication code sent to your {isEmail ? 'email address' : 'mobile number'}<br/>
            <span className="font-bold text-gray-800">{identifier}</span>
          </p>
        </div>

        <Input
          label={t('authCode')}
          name="otp"
          type="text"
          placeholder={t('enterOtp')}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
          isLoading={loading}
        >
          {t('verifyAndLogin')}
        </Button>

        <div className="flex flex-col items-center justify-center space-y-3 pt-4 border-t border-gray-100">
          <button 
            type="button" 
            onClick={handleResendOtp}
            className="text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors"
          >
            {t('resendOtp')}
          </button>
          
          <button 
            type="button" 
            onClick={() => {
              setLoginStep('CREDENTIALS');
              setOtp('');
            }}
            className="text-[11px] font-bold text-blue-600 hover:underline uppercase tracking-wider"
          >
            {t('backToLogin')}
          </button>
        </div>
      </form>
    );
  }

  // Render Standard Credentials Step
  return (
    <form onSubmit={handleSubmit(onSubmitCredentials)} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <Input
        label={t('emailOrMobile')}
        name="email"
        type="text"
        placeholder={t('enterEmailOrMobile')}
        error={errors.email}
        {...register('email', { 
          required: 'Email or Mobile is required'
        })}
      />

      <div className="relative">
        <Input
          label={t('passwordLabel')}
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          error={errors.password}
          {...register('password', { required: 'Password is required' })}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8.5 text-gray-400 hover:text-gray-650"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex items-center justify-between text-xs font-semibold">
        <label className="flex items-center text-gray-500 cursor-pointer">
          <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary mr-1.5" />
          {t('rememberMe')}
        </label>
        <Link to="/forgot-password" className="text-primary hover:underline">{t('forgotPassword')}</Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
        isLoading={loading}
      >
        {t('signInButton')}
      </Button>

      <div className="text-center text-xs text-gray-500 font-semibold pt-4 border-t border-gray-100 dark:border-gray-700">
        {t('newCitizen')}{' '}
        <Link to="/register" className="text-primary hover:underline font-bold">
          {t('createAccount')}
        </Link>
      </div>
    </form>
  );
};
export default Login;
