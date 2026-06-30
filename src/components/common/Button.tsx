import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-terminal-green/10 text-terminal-green border border-terminal-green/50 hover:bg-terminal-green/20 hover:shadow-lg hover:shadow-terminal-green/20 active:scale-95',
    secondary: 'bg-terminal-purple/10 text-terminal-purple border border-terminal-purple/50 hover:bg-terminal-purple/20 hover:shadow-lg hover:shadow-terminal-purple/20 active:scale-95',
    ghost: 'bg-transparent text-terminal-text hover:bg-white/5 active:scale-95',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
