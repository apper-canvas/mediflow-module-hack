import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md hover:shadow-lg hover:scale-105 focus:ring-primary-500/50",
    secondary: "border border-secondary-300 text-secondary-700 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-secondary-100 hover:scale-105 focus:ring-secondary-500/50",
    success: "bg-gradient-to-r from-success-600 to-success-700 text-white shadow-md hover:shadow-lg hover:scale-105 focus:ring-success-500/50",
    warning: "bg-gradient-to-r from-warning-500 to-warning-600 text-white shadow-md hover:shadow-lg hover:scale-105 focus:ring-warning-500/50",
    error: "bg-gradient-to-r from-error-600 to-error-700 text-white shadow-md hover:shadow-lg hover:scale-105 focus:ring-error-500/50",
    ghost: "text-secondary-700 hover:bg-gradient-to-r hover:from-secondary-100 hover:to-secondary-200 hover:scale-105"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;