import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry, className }) => {
  return (
    <Card className={`p-8 text-center ${className || ""}`}>
      <div className="w-16 h-16 bg-gradient-to-r from-error-100 to-error-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="AlertTriangle" className="text-error-600" size={32} />
      </div>
      
      <h3 className="text-lg font-semibold text-secondary-900 mb-2">
        Something went wrong
      </h3>
      
      <p className="text-secondary-600 mb-6 max-w-md mx-auto">
        {message || "We encountered an error while loading the data. Please try again."}
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </Card>
  );
};

export default Error;