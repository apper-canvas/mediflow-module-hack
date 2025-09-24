import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { cn } from "@/utils/cn";

const AppointmentCalendar = ({ appointments, onAppointmentClick, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAppointmentsForDay = (date) => {
    return appointments.filter(apt => 
      isSameDay(new Date(apt.date), date)
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: "accent",
      completed: "success", 
      cancelled: "error",
      pending: "warning"
    };
    return colors[status] || "accent";
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-secondary-900 to-secondary-700 bg-clip-text text-transparent">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigateMonth(-1)}
          >
            <ApperIcon name="ChevronLeft" size={16} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigateMonth(1)}
          >
            <ApperIcon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-secondary-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const dayAppointments = getAppointmentsForDay(day);
          const hasAppointments = dayAppointments.length > 0;

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[100px] p-2 border border-secondary-100 rounded-lg cursor-pointer hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-100 transition-all duration-200",
                isToday(day) && "bg-gradient-to-br from-primary-100 to-primary-200 border-primary-300",
                hasAppointments && !isToday(day) && "bg-gradient-to-br from-accent-50 to-accent-100"
              )}
              onClick={() => onDateClick && onDateClick(day)}
            >
              <div className="text-sm font-medium text-secondary-700 mb-1">
                {format(day, "d")}
              </div>
              
              <div className="space-y-1">
                {dayAppointments.slice(0, 2).map(appointment => (
                  <div
                    key={appointment.Id}
                    className="text-xs p-1 rounded cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAppointmentClick && onAppointmentClick(appointment);
                    }}
                  >
                    <Badge variant={getStatusColor(appointment.status)} size="sm">
                      {appointment.time}
                    </Badge>
                  </div>
                ))}
                {dayAppointments.length > 2 && (
                  <div className="text-xs text-secondary-500 font-medium">
                    +{dayAppointments.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AppointmentCalendar;