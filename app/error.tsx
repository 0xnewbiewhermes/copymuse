"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-center py-20 space-y-4">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-gray-500 text-sm">Please try again or come back later.</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
