import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend,
  trendValue,
  color = "primary",
  className 
}) => {
  const colors = {
    primary: "text-primary-600 bg-primary-50",
    success: "text-success-600 bg-success-50",
    warning: "text-warning-600 bg-warning-50",
    error: "text-error-600 bg-error-50",
    accent: "text-accent-600 bg-accent-50"
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600 mb-1">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-secondary-900 to-secondary-700 bg-clip-text text-transparent">
            {value}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <ApperIcon 
                name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
                className={cn(
                  "mr-1",
                  trend === "up" ? "text-success-600" : "text-error-600"
                )}
                size={16}
              />
              <span className={cn(
                "text-sm font-medium",
                trend === "up" ? "text-success-600" : "text-error-600"
              )}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-lg", colors[color])}>
          <ApperIcon name={icon} size={24} />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;