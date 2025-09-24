import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import { patientService } from '@/services/api/patientService';

const RegisterPatient = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact name is required';
    }
    
    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency contact phone is required';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please correct the errors in the form');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Prepare patient data for service
      const patientData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone
      };

      await patientService.create(patientData);
      
      toast.success('Patient registered successfully!');
      navigate('/patients', { replace: true });
      
    } catch (error) {
      console.error('Failed to register patient:', error);
      toast.error(error.message || 'Failed to register patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="shrink-0"
            >
              <ApperIcon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">
                Register New Patient
              </h1>
              <p className="text-secondary-600 mt-1">
                Enter patient information to create a new medical record
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-900 flex items-center gap-2">
                <ApperIcon name="User" size={20} className="text-primary-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  required
                  placeholder="Enter first name"
                />
                
                <FormField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  required
                  placeholder="Enter last name"
                />
              </div>

              <FormField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                error={errors.dateOfBirth}
                required
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-900 flex items-center gap-2">
                <ApperIcon name="Mail" size={20} className="text-primary-600" />
                Contact Information
              </h3>
              
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
                placeholder="patient@example.com"
              />
              
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                required
                placeholder="(555) 123-4567"
              />
              
              <FormField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                error={errors.address}
                required
                placeholder="Street address, City, State, ZIP"
              />
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-900 flex items-center gap-2">
                <ApperIcon name="Phone" size={20} className="text-primary-600" />
                Emergency Contact
              </h3>
              
              <FormField
                label="Emergency Contact Name"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                error={errors.emergencyContact}
                required
                placeholder="Full name of emergency contact"
              />
              
              <FormField
                label="Emergency Contact Phone"
                name="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                error={errors.emergencyPhone}
                required
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-secondary-200">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleCancel}
                className="sm:w-auto w-full"
              >
                <ApperIcon name="X" size={16} className="mr-2" />
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="sm:w-auto w-full sm:ml-auto"
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <ApperIcon name="UserPlus" size={16} className="mr-2" />
                    Register Patient
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPatient;