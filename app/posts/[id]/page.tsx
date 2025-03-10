import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PageProps) {
  const data = await prisma.blogPost.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!data) {
    return notFound();
  }
  return <div>page</div>;
}
