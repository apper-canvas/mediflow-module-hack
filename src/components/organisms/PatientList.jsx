import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const PatientList = ({ patients, onViewPatient, onEditPatient }) => {
  const getPatientStatus = (patient) => {
    const hasRecentVisit = patient.medicalHistory && patient.medicalHistory.length > 0;
    return hasRecentVisit ? "active" : "inactive";
  };

  const getPatientPriority = (patient) => {
    if (patient.medicalHistory && patient.medicalHistory.some(record => record.followUpRequired)) {
      return "high";
    }
    return "normal";
  };

  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <Card key={patient.Id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                <ApperIcon name="User" className="text-primary-600" size={20} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {patient.firstName} {patient.lastName}
                  </h3>
                  <StatusIndicator 
                    status={getPatientStatus(patient)} 
                    showLabel={false}
                  />
                  {getPatientPriority(patient) === "high" && (
                    <Badge variant="warning" size="sm">Priority</Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-sm text-secondary-600">
                    <ApperIcon name="Calendar" size={16} className="mr-2" />
                    Born {format(new Date(patient.dateOfBirth), "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center text-sm text-secondary-600">
                    <ApperIcon name="Phone" size={16} className="mr-2" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center text-sm text-secondary-600">
                    <ApperIcon name="Mail" size={16} className="mr-2" />
                    {patient.email}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-secondary-600">
                  <ApperIcon name="MapPin" size={16} className="mr-2" />
                  {patient.address.street}, {patient.address.city}, {patient.address.state} {patient.address.zipCode}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onViewPatient(patient)}
              >
                <ApperIcon name="Eye" size={16} className="mr-2" />
                View
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onEditPatient(patient)}
              >
                <ApperIcon name="Edit" size={16} className="mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PatientList;