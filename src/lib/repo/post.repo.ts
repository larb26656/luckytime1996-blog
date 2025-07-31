import { getCollection, type CollectionEntry } from "astro:content";
import { sortBy, type OrderDirection } from "@/lib/utils/sort";

type PostEntry = CollectionEntry<"blog">;

interface PostFilterOption {
  criteria?: PostFilterCriteria;
  sort?: PostFilterSort;
}

interface PostFilterCriteria {
  type?: string;
  draft?: boolean;
}

interface PostFilterSort {
  date?: OrderDirection;
}

export async function getAllPosts({
  criteria = {},
  sort = {},
}: PostFilterOption): Promise<PostEntry[]> {
  let blogs = await getCollection("blog");

  blogs = filterPosts(blogs, criteria);
  blogs = sortPosts(blogs, sort);

  return blogs;
}

export async function countAllPosts({
  criteria = {},
  sort = {},
}: PostFilterOption): Promise<PostEntry[]> {
  let blogs = await getCollection("blog");

  blogs = filterPosts(blogs, criteria);
  blogs = sortPosts(blogs, sort);

  return blogs;
}

function filterPosts(
  blogs: PostEntry[],
  criteria: PostFilterCriteria
): PostEntry[] {
  const { type, draft } = criteria;
  const conditions: ((blog: PostEntry) => boolean)[] = [];

  if (type !== undefined) {
    conditions.push((blog) => blog.data.type === type);
  }

  if (draft !== undefined) {
    conditions.push((blog) => blog.data.draft === draft);
  }

  return blogs.filter((blog) =>
    conditions.every((condition) => condition(blog))
  );
}

function sortPosts(blogs: PostEntry[], sort: PostFilterSort): PostEntry[] {
  const { date } = sort;

  if (date) {
    blogs = sortBy(blogs, (blog) => blog.data.date.valueOf(), date);
  }

  return blogs;
}
