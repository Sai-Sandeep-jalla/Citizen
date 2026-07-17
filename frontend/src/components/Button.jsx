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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary:   'bg-[#0B1E47] text-white hover:bg-[#1D4ED8] focus:ring-[#1D4ED8] shadow-sm',
    secondary: 'bg-[#F97316] text-white hover:bg-[#EA580C] focus:ring-[#F97316] shadow-sm',
    outline:   'border border-[#E2E8F0] bg-white text-[#0B1E47] hover:bg-[#F8FAFC] hover:border-[#0B1E47] focus:ring-[#1D4ED8]',
    danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success:   'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    ghost:     'text-[#0B1E47] hover:bg-[#EFF6FF] hover:text-[#1D4ED8] focus:ring-[#1D4ED8]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
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
