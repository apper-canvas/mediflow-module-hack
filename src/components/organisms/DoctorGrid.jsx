import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import ApperIcon from "@/components/ApperIcon";

const DoctorGrid = ({ doctors, onViewDoctor, onEditDoctor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <Card key={doctor.Id} className="p-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="UserCheck" className="text-primary-600" size={24} />
            </div>
            
            <h3 className="text-lg font-semibold text-secondary-900 mb-1">
              Dr. {doctor.name}
            </h3>
            
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Badge variant="primary" size="sm">
                {doctor.specialization}
              </Badge>
              <StatusIndicator 
                status={doctor.isActive ? "active" : "inactive"} 
                size="sm"
              />
            </div>
            
            <p className="text-sm text-secondary-600 mb-4">
              {doctor.department}
            </p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-secondary-600">
              <ApperIcon name="Phone" size={16} className="mr-3" />
              {doctor.phone}
            </div>
            <div className="flex items-center text-sm text-secondary-600">
              <ApperIcon name="Mail" size={16} className="mr-3" />
              {doctor.email}
            </div>
            <div className="flex items-center text-sm text-secondary-600">
              <ApperIcon name="Clock" size={16} className="mr-3" />
              {doctor.schedule.startTime} - {doctor.schedule.endTime}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => onViewDoctor(doctor)}
            >
              <ApperIcon name="Eye" size={16} className="mr-2" />
              View
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => onEditDoctor(doctor)}
            >
              <ApperIcon name="Edit" size={16} className="mr-2" />
              Edit
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DoctorGrid;