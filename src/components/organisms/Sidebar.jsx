import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    { path: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { path: "/patients", icon: "Users", label: "Patients" },
    { path: "/appointments", icon: "Calendar", label: "Appointments" },
    { path: "/doctors", icon: "Stethoscope", label: "Doctors" },
    { path: "/reports", icon: "FileBarChart", label: "Reports" }
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      onClick={() => onClose && onClose()}
      className={({ isActive }) => cn(
        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
        isActive 
          ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md"
          : "text-secondary-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-700 hover:scale-105"
      )}
    >
      <ApperIcon 
        name={item.icon} 
        className="mr-3 flex-shrink-0" 
        size={20}
      />
      {item.label}
    </NavLink>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-white border-r border-secondary-200">
        <div className="flex items-center flex-shrink-0 px-4 mb-8">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg">
              <ApperIcon name="Heart" className="text-white" size={24} />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
                MediFlow
              </h1>
              <p className="text-xs text-secondary-500">Hospital Management</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 pb-4 space-y-2">
          {navigationItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </nav>
        
        <div className="px-4 py-4 border-t border-secondary-200">
          <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-accent-50 to-accent-100">
            <div className="bg-accent-500 p-2 rounded-lg">
              <ApperIcon name="Shield" className="text-white" size={16} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-accent-800">Secure Access</p>
              <p className="text-xs text-accent-600">HIPAA Compliant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm lg:hidden z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-secondary-200 lg:hidden transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-5">
          <div className="flex items-center justify-between px-4 mb-8">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg">
                <ApperIcon name="Heart" className="text-white" size={24} />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
                  MediFlow
                </h1>
                <p className="text-xs text-secondary-500">Hospital Management</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-secondary-400 hover:bg-secondary-100 hover:text-secondary-600"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>
          
          <nav className="flex-1 px-4 pb-4 space-y-2">
            {navigationItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </nav>
          
          <div className="px-4 py-4 border-t border-secondary-200">
            <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-accent-50 to-accent-100">
              <div className="bg-accent-500 p-2 rounded-lg">
                <ApperIcon name="Shield" className="text-white" size={16} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-accent-800">Secure Access</p>
                <p className="text-xs text-accent-600">HIPAA Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;