import { DeletePost } from "@/app/actions";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params; // Extract id properly
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!data) {
    return notFound();
  }

  const isOwner = user?.id === data.authorId;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center w-full">
        <Link
          href="/posts"
          className={buttonVariants({ variant: "secondary" })}
        >
          Back to posts
        </Link>
        {isOwner && (
          <div className="flex space-x-2">
            <Link href={`/posts/${id}/edit`} className={buttonVariants()}>
              Edit
            </Link>
            <form action={DeletePost}>
              <input type="hidden" name="postId" value={id} />
              <button
                type="submit"
                className={buttonVariants({ variant: "destructive" })}
              >
                Delete
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium">{data.authorName}</p>
          </div>
          <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(data.createdAt)}
          </p>
        </div>
      </div>
      <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <Card>
        <CardContent className="text-gray-700">{data.content}</CardContent>
      </Card>
    </div>
  );
}
