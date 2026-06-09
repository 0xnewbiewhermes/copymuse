import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20 space-y-4">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="text-gray-500 text-sm">Page not found</p>
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
