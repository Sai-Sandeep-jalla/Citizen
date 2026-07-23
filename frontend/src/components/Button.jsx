/**
 * @file Button.jsx
 * @description Reusable button component with various styles, sizes, and loading states.
 */

import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';
  
  const variants = {
    primary:   'bg-gradient-to-r from-[#0B1E47] to-[#1D4ED8] text-white shadow-lg shadow-blue-900/20 hover:shadow-xl hover:from-[#1D4ED8] hover:to-[#0B1E47] focus:ring-[#1D4ED8]',
    secondary: 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-lg shadow-orange-900/20 hover:shadow-xl hover:from-[#EA580C] hover:to-[#F97316] focus:ring-[#F97316]',
    outline:   'border-2 border-[#E2E8F0] bg-white/50 backdrop-blur-sm text-[#0B1E47] hover:bg-white hover:border-[#1D4ED8] hover:text-[#1D4ED8] focus:ring-[#1D4ED8] shadow-sm',
    danger:    'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-900/20 hover:from-red-600 hover:to-red-700 focus:ring-red-500',
    success:   'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-900/20 hover:from-green-600 hover:to-green-700 focus:ring-green-500',
    ghost:     'text-[#0B1E47] hover:bg-[#EFF6FF] hover:text-[#1D4ED8] focus:ring-[#1D4ED8]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />
      ) : null}
      {children}
    </button>
  );
};
