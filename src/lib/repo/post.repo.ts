import { getCollection, type CollectionEntry } from "astro:content";
import { sortBy, type OrderDirection } from "../utils/sort";

type PostEntry = CollectionEntry<"blog">;

interface PostFilterOption {
  criteria?: PostFilterCriteria;
  sort?: PostFilterSort;
  page?: PostFilterPaginate;
}

interface PostFilterCriteria {
  type?: string;
}

interface PostFilterSort {
  date?: OrderDirection;
}

interface PostFilterPaginate {
  limit?: number;
  offset?: number;
}

export async function getAllPosts({
  criteria = {},
  sort = {},
  page = {},
}: PostFilterOption): Promise<PostEntry[]> {
  let blogs = await getCollection("blog");

  blogs = filterPosts(blogs, criteria);
  blogs = sortPosts(blogs, sort);
  blogs = paginatePosts(blogs, page);

  return blogs;
}

function filterPosts(
  blogs: PostEntry[],
  criteria: PostFilterCriteria
): PostEntry[] {
  const { type } = criteria;

  if (type) {
    blogs = blogs.filter((blog) => blog.data.type === type);
  }

  return blogs;
}

function sortPosts(blogs: PostEntry[], sort: PostFilterSort): PostEntry[] {
  const { date } = sort;

  if (date) {
    blogs = sortBy(blogs, (blog) => blog.data.date.valueOf(), date);
  }

  return blogs;
}

function paginatePosts(
  blogs: PostEntry[],
  page: PostFilterPaginate
): PostEntry[] {
  const { offset = 0, limit = 10 } = page;
  return blogs.slice(offset, offset + limit);
}
