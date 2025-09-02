'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/schools', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSchools(data.schools || []);
      } else {
        setError(data.error || 'Failed to fetch schools');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Network error: Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchSchools}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Schools Directory</h1>
              <p className="text-gray-600 mt-1">Discover and explore schools in your area</p>
            </div>
            <Link 
              href="/addSchool"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add New School
            </Link>
          </div>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {schools.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600 mb-6">Start by adding your first school to the directory.</p>
            <Link 
              href="/addSchool"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Add First School
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600">
              Showing {schools.length} school{schools.length !== 1 ? 's' : ''}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {schools.map((school) => (
                <div 
                  key={school.id} 
                  className="bg-white rounded-lg shadow-md hover:shadow-lg school-card overflow-hidden"
                >
                  {/* School Image */}
                  <div className="relative h-48 w-full bg-gray-200">
                    {school.image ? (
                      <Image
                        src={school.image}
                        alt={school.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <svg className="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* School Information */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {school.name}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <svg className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="line-clamp-2">
                          {school.address}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4" />
                        </svg>
                        <span className="font-medium text-blue-600">
                          {school.city}
                        </span>
                      </div>
                    </div>

                    {/* Contact Info - Hidden on mobile, shown on hover or larger screens */}
                    <div className="mt-4 pt-3 border-t border-gray-100 hidden sm:block">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Contact: {school.contact}</span>
                        <span>{school.state}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
