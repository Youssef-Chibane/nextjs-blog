import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
      <p className="text-lg mt-2 text-gray-700">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
