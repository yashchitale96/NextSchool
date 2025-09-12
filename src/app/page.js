'use client';

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Header with Auth Status */}
      <header className="row-start-1 w-full max-w-4xl flex justify-between items-center">
        <div className="text-sm text-gray-600">
          NextSchool Management System
        </div>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 rounded px-3 py-1"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-green-600">
                ✓ {user?.email}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-foreground mb-4">NextSchool</h1>
          <p className="text-lg text-foreground/80">School Management System</p>
        </div>
        
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm/6 mb-4">
            Manage school data with our easy-to-use platform
          </p>
          {!isAuthenticated && !isLoading && (
            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md p-2">
              📝 Login required to add schools. Anyone can view the directory.
            </p>
          )}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {isAuthenticated ? (
            <Link
              href="/addSchool"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add School
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login to Add Schools
            </Link>
          )}
          
          <Link
            href="/showSchools"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4" />
            </svg>
            View Schools
          </Link>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {isAuthenticated ? (
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/addSchool"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add School
          </Link>
        ) : (
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="/login"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
            </svg>
            Login
          </Link>
        )}
        
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/showSchools"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4" />
          </svg>
          View Schools
        </Link>
        
        <span className="text-gray-500 text-sm">
          Built by Yash Chitale
        </span>
      </footer>
    </div>
  );
}
