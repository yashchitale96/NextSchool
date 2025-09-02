'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddSchool() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Client-side validation
      if (!data.name?.trim()) {
        throw new Error('School name is required');
      }
      
      const formData = new FormData();
      formData.append('name', data.name.trim());
      formData.append('address', data.address.trim());
      formData.append('city', data.city.trim());
      formData.append('state', data.state.trim());
      formData.append('contact', data.contact.trim());
      formData.append('email_id', data.email_id.trim());
      
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('✅ School added successfully! Redirecting...');
        reset();
        setTimeout(() => {
          router.push('/showSchools');
        }, 1500);
      } else {
        setSubmitMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitMessage(`❌ Error: ${error.message || 'Failed to add school'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center">Add New School</h1>
            <p className="text-gray-600 text-center mt-2">Fill in the details to add a new school</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* School Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                School Name *
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { 
                  required: 'School name is required',
                  minLength: {
                    value: 3,
                    message: 'School name must be at least 3 characters'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Enter school name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                id="address"
                rows={3}
                {...register('address', { 
                  required: 'Address is required',
                  minLength: {
                    value: 10,
                    message: 'Address must be at least 10 characters'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Enter full address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  {...register('city', { 
                    required: 'City is required',
                    minLength: {
                      value: 2,
                      message: 'City must be at least 2 characters'
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  {...register('state', { 
                    required: 'State is required',
                    minLength: {
                      value: 2,
                      message: 'State must be at least 2 characters'
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                id="contact"
                {...register('contact', { 
                  required: 'Contact number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Contact number must be exactly 10 digits'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Enter 10-digit contact number"
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email_id"
                {...register('email_id', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                placeholder="Enter email address"
              />
              {errors.email_id && (
                <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                School Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register('image', {
                  validate: {
                    fileSize: (files) => {
                      if (files && files[0] && files[0].size > 5 * 1024 * 1024) {
                        return 'File size must be less than 5MB';
                      }
                      return true;
                    }
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">Optional: Upload a school image (max 5MB)</p>
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div className={`p-4 rounded-md ${submitMessage.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {submitMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Adding School...' : 'Add School'}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/showSchools')}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                View Schools
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
