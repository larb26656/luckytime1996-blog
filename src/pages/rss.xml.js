import rss from '@astrojs/rss';
import { getAllPosts } from '@/lib/repo/post.repo';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const allPosts = await getAllPosts({
		criteria: {
			draft: false,
		},
		sort: {
			date: "DESC",
		},
	});

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allPosts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
