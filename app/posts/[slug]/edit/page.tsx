import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import SubmitButton from "@/components/general/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UpdatePost } from "@/app/actions";

type Params = Promise<{ slug: string }>;

export default async function EditPost({ params }: { params: Params }) {
  const { slug } = await params;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await prisma.blogPost.findUnique({
    where: {
      slug,
    },
  });

  if (!data) {
    return notFound();
  }
  const isOwner = user?.id === data.authorId; // Check if the logged-in user is the post owner

  return (
    <div className="py-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new post to share with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={UpdatePost}>
            <Input type="hidden" name="slug" value={slug} />
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                name="title"
                required
                type="text"
                placeholder="Title"
                defaultValue={data.title}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <Textarea
                name="content"
                required
                placeholder="Content"
                defaultValue={data.content}
              />
              <div className="flex flex-col gap-2">
                <Label>Image Url</Label>
                <Input
                  name="url"
                  required
                  type="url"
                  placeholder="Image Url"
                  defaultValue={data.imageUrl}
                />
              </div>
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
