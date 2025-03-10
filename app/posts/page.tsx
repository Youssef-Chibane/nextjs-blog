import BlogPostCard from "@/components/general/BlogPostCard";
import Hero from "@/components/general/Hero";
import { prisma } from "@/lib/prisma";

async function getData() {
  const data = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function PostsPage() {
  const data = await getData();
  const count = await prisma.blogPost.count();
  return (
    <div>
      <h1 className="py-6 text-3xl font-bold tracking-tight" id="latest-posts">
        All Blog Articles({count}):
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id}>
            <BlogPostCard key={item.id} data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
