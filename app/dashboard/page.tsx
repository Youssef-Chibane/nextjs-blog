import BlogPostCard from "@/components/general/BlogPostCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { Suspense } from "react";
import loading from "../loading";

export default function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="py-6 text-3xl font-bold tracking-tight">
          Your Blog Articles:
        </h1>
        <Link className={buttonVariants()} href={"/dashboard/create"}>
          Create Post
        </Link>
      </div>
      <Suspense fallback={loading()}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}

async function BlogPosts() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await prisma.blogPost.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const count = await prisma.blogPost.count({
    where: {
      authorId: user.id,
    },
  });

  return (
    <>
      {count === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
            No blog posts yet! Start your journey by creating the first one.
          </h1>
          <Link
            className={`${buttonVariants()} mt-4`}
            href={"/dashboard/create"}
          >
            Create Post
          </Link>
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
    </>
  );
}
