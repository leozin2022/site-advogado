import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 transition-all duration-300 uppercase tracking-widest text-sm font-semibold";
  
  const variants = {
    primary: "bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg border border-transparent",
    outline: "bg-transparent text-white border border-amber-600 hover:bg-amber-600 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;