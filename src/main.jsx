import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "@/components/pages/Dashboard";

// Placeholder components for Quick Action routes
const RegisterPatient = () => <div className="p-6"><h1 className="text-2xl font-bold">Register New Patient</h1><p>Patient registration form will be implemented here.</p></div>
const NewAppointment = () => <div className="p-6"><h1 className="text-2xl font-bold">Schedule Appointment</h1><p>Appointment scheduling form will be implemented here.</p></div>
const SearchPatients = () => <div className="p-6"><h1 className="text-2xl font-bold">Search Patient Records</h1><p>Patient search functionality will be implemented here.</p></div>
const ViewRecords = () => <div className="p-6"><h1 className="text-2xl font-bold">Medical Records</h1><p>Medical records viewer will be implemented here.</p></div>

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patients/new" element={<RegisterPatient />} />
      <Route path="/appointments/new" element={<NewAppointment />} />
      <Route path="/patients/search" element={<SearchPatients />} />
      <Route path="/records" element={<ViewRecords />} />
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={3000}
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
);