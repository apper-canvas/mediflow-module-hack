import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title, 
  message, 
  action,
  actionLabel = "Get Started",
  icon = "Inbox",
  className 
}) => {
  return (
    <Card className={`p-8 text-center ${className || ""}`}>
      <div className="w-16 h-16 bg-gradient-to-r from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name={icon} className="text-secondary-500" size={32} />
      </div>
      
      <h3 className="text-lg font-semibold text-secondary-900 mb-2">
        {title || "No data available"}
      </h3>
      
      <p className="text-secondary-600 mb-6 max-w-md mx-auto">
        {message || "There's nothing to show here yet. Start by adding some data."}
      </p>
      
      {action && (
        <Button onClick={action} variant="primary">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export default Empty;