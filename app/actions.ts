"use server";

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function CreatePost(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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
