export default function LoadingPage({ text = "Loading..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>

      {/* Text */}
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        {text}
      </p>

    </div>
  );
}
