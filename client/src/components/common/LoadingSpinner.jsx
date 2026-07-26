export default function LoadingSpinner({
  text = "Processing...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

      <p className="mt-5 text-lg font-semibold text-gray-700">
        {text}
      </p>

      <p className="text-gray-500 mt-2">
        This may take a few seconds...
      </p>
    </div>
  );
}