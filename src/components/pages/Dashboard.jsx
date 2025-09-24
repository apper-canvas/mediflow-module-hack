import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StatCard from "@/components/molecules/StatCard";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { patientService } from "@/services/api/patientService";
import { appointmentService } from "@/services/api/appointmentService";
import { doctorService } from "@/services/api/doctorService";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleQuickAction = (action, route) => {
    toast.info(`Navigating to ${action}...`);
    navigate(route);
  };
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    activeDoctors: 0,
    pendingAppointments: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [patients, appointments, doctors] = await Promise.all([
        patientService.getAll(),
        appointmentService.getAll(),
        doctorService.getAll()
      ]);

      const today = format(new Date(), "yyyy-MM-dd");
      const todayAppointments = appointments.filter(apt => apt.date === today);
      const pendingAppointments = appointments.filter(apt => apt.status === "pending");
      const activeDoctors = doctors.filter(doc => doc.isActive);

      setStats({
        totalPatients: patients.length,
        todayAppointments: todayAppointments.length,
        activeDoctors: activeDoctors.length,
        pendingAppointments: pendingAppointments.length
      });

      // Get recent appointments (next 5 upcoming)
      const upcoming = appointments
        .filter(apt => apt.status === "scheduled")
        .sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time))
        .slice(0, 5);

      setRecentAppointments(upcoming);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Loading type="stats" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Loading />
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadDashboardData} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon="Users"
          color="primary"
          trend="up"
          trendValue="+12 this month"
        />
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon="Calendar"
          color="accent"
          trend="up"
          trendValue="+5 from yesterday"
        />
        <StatCard
          title="Active Doctors"
          value={stats.activeDoctors}
          icon="Stethoscope"
          color="success"
        />
        <StatCard
          title="Pending Appointments"
          value={stats.pendingAppointments}
          icon="Clock"
          color="warning"
          trend="down"
          trendValue="-3 from last week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-secondary-900 to-secondary-700 bg-clip-text text-transparent">
              Upcoming Appointments
            </h2>
            <Button variant="secondary" size="sm">
              <ApperIcon name="Calendar" size={16} className="mr-2" />
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div key={appointment.Id} className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                    <ApperIcon name="Clock" className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Patient ID: {appointment.patientId}</p>
                    <p className="text-sm text-secondary-600">
                      {format(new Date(appointment.date), "MMM d, yyyy")} at {appointment.time}
                    </p>
                    <p className="text-sm text-accent-600">{appointment.type}</p>
                  </div>
                </div>
                <Button variant="primary" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-secondary-900 to-secondary-700 bg-clip-text text-transparent mb-6">
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
<Button 
              variant="primary" 
              size="lg" 
              className="justify-start"
              onClick={() => handleQuickAction('Register New Patient', '/patients/new')}
            >
              <ApperIcon name="UserPlus" size={20} className="mr-3" />
              Register New Patient
            </Button>
<Button 
              variant="secondary" 
              size="lg" 
              className="justify-start"
              onClick={() => handleQuickAction('Schedule Appointment', '/appointments/new')}
            >
              <ApperIcon name="Calendar" size={20} className="mr-3" />
              Schedule Appointment
            </Button>
<Button 
              variant="secondary" 
              size="lg" 
              className="justify-start"
              onClick={() => handleQuickAction('Search Patient Records', '/patients/search')}
            >
              <ApperIcon name="Search" size={20} className="mr-3" />
              Search Patient Records
            </Button>
<Button 
              variant="secondary" 
              size="lg" 
              className="justify-start"
              onClick={() => handleQuickAction('View Medical Records', '/records')}
            >
              <ApperIcon name="FileText" size={20} className="mr-3" />
              View Medical Records
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-success-50 to-success-100 rounded-lg">
            <div className="flex items-center">
              <div className="bg-success-500 p-2 rounded-lg">
                <ApperIcon name="Activity" className="text-white" size={16} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-success-800">System Status</p>
                <p className="text-xs text-success-600">All systems operational</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;