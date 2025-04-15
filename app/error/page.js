"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const errorMessages = {
  auth_error: "Authentication failed. Please try again.",
  profile_error: "Could not load your profile. Please try again.",
  no_code: "Invalid authentication request. Please try again.",
  default: "An error occurred. Please try again.",
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams?.get("message");
  const errorMessage = errorMessages[message] || errorMessages.default;

  useEffect(() => {
    // Log error for debugging
    console.error("Error page loaded with message:", message);
  }, [message]);

  const handleTryAgain = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {errorMessage}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <button
              onClick={handleTryAgain}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
