import React from "react";

const ErrorFallback = () => (
  <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] p-6">
    <svg className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="2" className="text-red-200" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
    </svg>
    <h1 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-2">Something went wrong</h1>
    <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
      Sorry, we couldn't load the data. Please try refreshing the page or check your network connection.
    </p>
  </div>
);

export default ErrorFallback;
