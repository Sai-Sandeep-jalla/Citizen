import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { Input, Dropdown } from '../../components/FormControls';
import { Button } from '../../components/Button';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      role: 'CITIZEN'
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password, data.role);
      toast.success(`${t('welcome')}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Dropdown
        label={t('selectRole')}
        name="role"
        options={[
          { value: 'CITIZEN', label: t('citizenRole') },
          { value: 'OFFICER', label: t('officerRole') },
          { value: 'ADMIN', label: t('adminRole') }
        ]}
        error={errors.role}
        {...register('role', { required: 'Role selection is required' })}
      />

      <Input
        label={t('emailOrMobile')}
        name="email"
        type="text"
        placeholder={t('enterEmailOrMobile')}
        error={errors.email}
        {...register('email', { 
          required: 'Email or Mobile is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address format'
          }
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
        <a href="#forgot" className="text-primary hover:underline">{t('forgotPassword')}</a>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-2"
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
