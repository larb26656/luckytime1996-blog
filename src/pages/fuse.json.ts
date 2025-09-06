import { getCollection } from "astro:content";

export type FuseIndex = {
  title: string;
  description?: string;
  url: string;
};

export async function GET() {
  const posts = await getCollection("blog");

  const data: FuseIndex[] = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    url: `/blog/${post.id}`,
  }));

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
