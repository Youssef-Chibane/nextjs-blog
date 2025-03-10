import BlogPostCard from "@/components/general/BlogPostCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

async function getData(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData(user.id);

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
