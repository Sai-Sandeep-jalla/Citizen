/**
 * @file Register.jsx
 * @description Page component for new user registration.
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { Input } from '../../components/FormControls';
import { Button } from '../../components/Button';
import toast from 'react-hot-toast';

export const Register = () => {
  const { register: authRegister } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { role: '' }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await authRegister(
        data.userName,
        data.emailId,
        data.phoneNumber,
        data.password,
        'Citizen'
      );
      if (response?.message) toast.success(response.message);
      navigate('/login');
    } catch (err) {
      if (err.message) toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label={t('userName')}
        name="userName"
        placeholder={t('enterUserName')}
        error={errors.userName}
        {...register('userName', { required: 'User Name is required' })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t('emailLabel')}
          name="emailId"
          type="email"
          placeholder="example@email.com"
          error={errors.emailId}
          {...register('emailId', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        <Input
          label={t('mobileLabel')}
          name="phoneNumber"
          placeholder={t('enterPhoneNumber')}
          error={errors.phoneNumber}
          {...register('phoneNumber', { 
            required: 'Phone Number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Phone number must be exactly 10 digits'
            }
          })}
        />
      </div>

      <Input
        label={t('passwordLabel')}
        name="password"
        type="password"
        placeholder={t('passwordPlaceholder')}
        error={errors.password}
        {...register('password', { 
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters long' }
        })}
      />


      <Button
        type="submit"
        variant="primary"
        className="w-full mt-2"
        isLoading={loading}
      >
        {t('registerButton')}
      </Button>

      <div className="text-center text-xs text-gray-500 font-semibold pt-4 border-t border-gray-100 dark:border-gray-700">
        {t('alreadyAccount')}{' '}
        <Link to="/login" className="text-primary hover:underline font-bold">
          {t('signInHere')}
        </Link>
      </div>
    </form>
  );
};
export default Register;
