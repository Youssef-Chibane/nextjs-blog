"use server";

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function CreatePost(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await prisma.blogPost.create({
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      imageUrl: formData.get("url") as string,
      authorId: user.id,
      authorImage: user.picture as string,
      authorName: user.given_name as string,
    },
  });

  return redirect("/dashboard");
}

export async function DeletePost(formData: FormData) {
  // Get the post ID from the form data
  const postId = formData.get("postId") as string;

  // Get the current user's session
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Fetch the post to check if the user is the owner
  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the logged-in user is the owner of the post
  if (post.authorId !== user.id) {
    throw new Error("You are not authorized to delete this post");
  }

  // Proceed with deletion if the user is the author
  await prisma.blogPost.delete({
    where: { id: postId },
  });

  // Redirect after successful deletion
  return redirect("/dashboard");
}
