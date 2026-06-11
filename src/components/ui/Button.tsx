import React from 'react';
import type{ LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-400 shadow-lg shadow-orange-200/70',
    secondary: 'bg-stone-200 text-stone-800 hover:bg-stone-300 focus:ring-stone-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-orange-300 text-orange-700 hover:bg-orange-50 focus:ring-orange-300',
    ghost: 'text-stone-700 hover:bg-stone-100 focus:ring-stone-400',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="h-4 w-4 mr-2" />
      )}
      
      {children}
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="h-4 w-4 ml-2" />
      )}
    </button>
  );
};

export default Button;