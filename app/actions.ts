"use server";

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import { revalidate } from "./page";
import { revalidatePath } from "next/cache";

// Function to create a new blog post
export async function CreatePost(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Redirect to login if the user is not authenticated
  if (!user) {
    return redirect("/api/auth/login");
  }

  // Create a new blog post in the database
  const data = await prisma.blogPost.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"), // Remove duplicate hyphens
      content: formData.get("content") as string,
      imageUrl: formData.get("url") as string,
      authorId: user.id, // Assign the post to the authenticated user
      authorImage: user.picture as string,
      authorName: user.given_name as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/posts");

  // Redirect to the dashboard after successful post creation
  return redirect("/dashboard");
}

// Function to delete a blog post
export async function DeletePost(formData: FormData) {
  // Get the post ID (slug) from the form data
  const slug = formData.get("slug") as string;

  // Get the current user's session
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Fetch the post to check if the user is the owner
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  // If post is not found, throw an error
  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the logged-in user is the owner of the post
  if (post.authorId !== user.id) {
    throw new Error("You are not authorized to delete this post");
  }

  // Proceed with deletion if the user is the author
  await prisma.blogPost.delete({
    where: { slug },
  });

  revalidatePath("/");
  revalidatePath("/posts");

  // Redirect to the dashboard after successful deletion
  return redirect("/dashboard");
}

// Function to update an existing blog post
export async function UpdatePost(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Redirect to login if the user is not authenticated
  if (!user) {
    return redirect("/api/auth/login");
  }

  // Get the current slug from the form data
  const slug = formData.get("slug") as string;

  // Fetch the existing post from the database
  const existingPost = await prisma.blogPost.findUnique({
    where: { slug },
  });

  // Check if the logged-in user is the owner of the post
  if (existingPost?.authorId !== user.id) {
    throw new Error("Forbidden: You are not the owner of this post.");
  }

  // Update the post if the user is the owner
  await prisma.blogPost.update({
    where: { slug },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"), // Remove duplicate hyphens
      content: formData.get("content") as string,
      imageUrl: formData.get("url") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/posts");

  // Redirect to the dashboard after successful update
  return redirect("/dashboard");
}
