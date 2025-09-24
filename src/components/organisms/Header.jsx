import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Header = ({ onMenuClick, title, subtitle, actions }) => {
  return (
    <header className="bg-white border-b border-secondary-200 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden mr-3"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div>
            {title && (
              <h1 className="text-2xl font-bold bg-gradient-to-r from-secondary-900 to-secondary-700 bg-clip-text text-transparent">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {actions}
          
          <div className="flex items-center space-x-3 pl-3 border-l border-secondary-200">
            <Button variant="ghost" size="icon" className="relative">
              <ApperIcon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="text-white" size={16} />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-secondary-900">Dr. Sarah Johnson</p>
                <p className="text-xs text-secondary-600">Chief Medical Officer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;