import BlogPostCard from "@/components/general/BlogPostCard";
import { prisma } from "@/lib/prisma";

export default async function PostsPage() {
  const data = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const count = await prisma.blogPost.count();
  return (
    <div>
      <h1 className="py-6 text-3xl font-bold tracking-tight" id="latest-posts">
        All Blog Articles({count}):
      </h1>
      {count === 0 ? (
        <div className="flex items-center justify-center h-[50vh]">
          <h1 className="text-3xl font-bold text-gray-600">
            It looks empty here! Stay tuned for amazing content.
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <div key={item.id}>
              <BlogPostCard key={item.id} data={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
