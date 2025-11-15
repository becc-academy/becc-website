import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, Mail, MapPin, Phone, User, X } from 'lucide-react';

import { CustomSelect, ISelectOption } from '../common/CustomSelect';

export interface IEventRegistrationFormData {
  name: string;
  email: string;
  phone: string;
  ghanaCard: string;
  gender: 'male' | 'female' | 'other' | '';
  competenceLevel: 'beginner' | 'intermediate' | 'advanced' | '';
  location: string;
}

export interface IEventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  externalRegistrationUrl?: string;
  onSubmit?: (data: IEventRegistrationFormData) => void;
}

export const EventRegistrationModal: React.FC<IEventRegistrationModalProps> = ({
  isOpen,
  onClose,
  eventTitle,
  externalRegistrationUrl,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<IEventRegistrationFormData>({
    name: '',
    email: '',
    phone: '',
    ghanaCard: '',
    gender: '',
    competenceLevel: '',
    location: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof IEventRegistrationFormData, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genderOptions: ISelectOption[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const competenceLevelOptions: ISelectOption[] = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof IEventRegistrationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof IEventRegistrationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof IEventRegistrationFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.ghanaCard.trim()) newErrors.ghanaCard = 'Ghana Card is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // If external URL is provided, redirect to it
    if (externalRegistrationUrl) {
      window.open(externalRegistrationUrl, '_blank');
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 1000);
      return;
    }

    // Otherwise, call the onSubmit callback
    if (onSubmit) {
      try {
        onSubmit(formData);
        setFormData({
          name: '',
          email: '',
          phone: '',
          ghanaCard: '',
          gender: '',
          competenceLevel: '',
          location: '',
        });
        onClose();
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#e95001] to-[#d14801] text-white p-4 rounded-t-xl flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">Event Registration</h2>
                  <p className="text-white/90 text-xs mt-0.5">{eventTitle}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="max-h-[calc(85vh-80px)] overflow-y-auto px-5 py-4">
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                  className="space-y-3.5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center"
                    >
                      <User className="w-3.5 h-3.5 mr-1.5 text-[#e95001]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-[#e95001] focus:border-transparent transition-all`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center"
                    >
                      <Mail className="w-3.5 h-3.5 mr-1.5 text-[#e95001]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-[#e95001] focus:border-transparent transition-all`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center"
                    >
                      <Phone className="w-3.5 h-3.5 mr-1.5 text-[#e95001]" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-[#e95001] focus:border-transparent transition-all`}
                      placeholder="+233 XX XXX XXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Ghana Card */}
                  <div>
                    <label
                      htmlFor="ghanaCard"
                      className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center"
                    >
                      <CreditCard className="w-3.5 h-3.5 mr-1.5 text-[#e95001]" />
                      Ghana Card Number *
                    </label>
                    <input
                      type="text"
                      id="ghanaCard"
                      name="ghanaCard"
                      value={formData.ghanaCard}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border ${
                        errors.ghanaCard ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-[#e95001] focus:border-transparent transition-all`}
                      placeholder="GHA-XXXXXXXXX-X"
                    />
                    {errors.ghanaCard && (
                      <p className="text-red-500 text-xs mt-1">{errors.ghanaCard}</p>
                    )}
                  </div>

                  {/* Gender & Competence Level - Two Columns */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <CustomSelect
                        label="Gender"
                        options={genderOptions}
                        value={formData.gender}
                        onChange={(value) => handleSelectChange('gender', value)}
                        placeholder="Select Gender"
                        required
                        className="text-sm"
                      />
                      {errors.gender && (
                        <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                      )}
                    </div>

                    <div>
                      <CustomSelect
                        label="Level"
                        options={competenceLevelOptions}
                        value={formData.competenceLevel}
                        onChange={(value) => handleSelectChange('competenceLevel', value)}
                        placeholder="Select Level"
                        required
                        className="text-sm"
                      />
                      {errors.competenceLevel && (
                        <p className="text-red-500 text-xs mt-1">{errors.competenceLevel}</p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center"
                    >
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#e95001]" />
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 text-sm border ${
                        errors.location ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-[#e95001] focus:border-transparent transition-all`}
                      placeholder="City, Region"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-[#e95001] to-[#d14801] text-white rounded-lg font-bold text-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? 'Processing...' : 'Complete Registration'}
                    </motion.button>
                  </div>

                  <p className="text-[10px] text-gray-500 text-center pt-1">
                    By registering, you agree to receive event updates and communications.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
