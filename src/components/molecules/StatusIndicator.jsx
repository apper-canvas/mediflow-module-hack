import React from "react";
import { cn } from "@/utils/cn";

const StatusIndicator = ({ 
  status, 
  size = "md",
  showLabel = false,
  className 
}) => {
  const statusConfig = {
    scheduled: { color: "bg-accent-500", label: "Scheduled" },
    completed: { color: "bg-success-500", label: "Completed" },
    cancelled: { color: "bg-error-500", label: "Cancelled" },
    pending: { color: "bg-warning-500", label: "Pending" },
    active: { color: "bg-primary-500", label: "Active" },
    inactive: { color: "bg-secondary-400", label: "Inactive" }
  };

  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "rounded-full flex-shrink-0",
        config.color,
        sizes[size]
      )} />
      {showLabel && (
        <span className="text-sm text-secondary-700 capitalize">
          {config.label}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;