import "./index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "@/components/pages/Dashboard";
import Error from "@/components/ui/Error";

// Lazy load RegisterPatient for better performance
const RegisterPatient = React.lazy(() => import("@/components/pages/RegisterPatient"));

// Placeholder components for missing routes
const NewAppointment = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-secondary-900 mb-4">New Appointment</h1>
    <p className="text-secondary-600">Appointment scheduling coming soon...</p>
  </div>
);

const SearchPatients = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-secondary-900 mb-4">Search Patients</h1>
    <p className="text-secondary-600">Patient search functionality coming soon...</p>
  </div>
);

const ViewRecords = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-secondary-900 mb-4">Medical Records</h1>
    <p className="text-secondary-600">Medical records viewer coming soon...</p>
  </div>
);

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
  </div>
);

// Error Boundary Component
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
          <Error 
            message="Something went wrong with the application. Please refresh the page."
            onRetry={() => window.location.reload()}
            className="max-w-lg"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppErrorBoundary>
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients/new" element={<RegisterPatient />} />
          <Route path="/appointments/new" element={<NewAppointment />} />
          <Route path="/patients/search" element={<SearchPatients />} />
          <Route path="/records" element={<ViewRecords />} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  </AppErrorBoundary>
);