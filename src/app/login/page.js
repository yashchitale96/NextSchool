'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const { login, checkAuth, isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // Countdown timer for OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle email submission
  const onEmailSubmit = async (data) => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok) {
        setEmail(data.email);
        setStep(2);
        setCountdown(600); // 10 minutes countdown
        setMessage('✅ OTP sent to your email! Check your inbox.');
        reset();
      } else {
        setMessage(`❌ ${result.error || 'Failed to send OTP'}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const onOTPSubmit = async (data) => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          otp: data.otp 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Update authentication state
        login(result.user);
        
        setMessage('✅ Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setMessage(`❌ ${result.error || 'Invalid OTP'}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setCountdown(600);
        setMessage('✅ New OTP sent to your email!');
      } else {
        setMessage(`❌ ${result.error || 'Failed to resend OTP'}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Format countdown timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">NextSchool</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            {step === 1 ? 'Sign in to your account' : 'Enter verification code'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1 
              ? 'Enter your email to receive a login code' 
              : `We sent a 6-digit code to ${email}`
            }
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 ? (
            // Email Form
            <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending code...
                    </div>
                  ) : (
                    'Send login code'
                  )}
                </button>
              </div>
            </form>
          ) : (
            // OTP Form
            <form onSubmit={handleSubmit(onOTPSubmit)} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Verification code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="otp"
                    maxLength={6}
                    {...register('otp', {
                      required: 'OTP is required',
                      pattern: {
                        value: /^\d{6}$/,
                        message: 'Please enter a valid 6-digit code'
                      }
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-mono tracking-widest text-gray-900 bg-white"
                    placeholder="000000"
                  />
                  {errors.otp && (
                    <p className="mt-1 text-sm text-red-600">{errors.otp.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify and sign in'
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  ← Use different email
                </button>
                
                <button
                  type="button"
                  onClick={resendOTP}
                  disabled={countdown > 0 || isLoading}
                  className="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {countdown > 0 ? `Resend in ${formatTime(countdown)}` : 'Resend code'}
                </button>
              </div>
            </form>
          )}

          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              message.includes('❌') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Secure Login:</strong> We'll send a 6-digit code to your email. 
                  No passwords needed! The code expires in 10 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}