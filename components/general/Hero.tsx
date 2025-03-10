import Link from "next/link";

export default function Hero() {
    return (
      <section className="text-center py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to the Blog
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore insightful articles and stay updated with the latest trends.
          </p>
          <Link
            href="/posts"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition"
          >
            Browse All Posts
          </Link>
        </div>
      </section>
    );
  }
  