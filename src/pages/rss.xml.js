import rss from '@astrojs/rss';
import { getAllPosts } from '@/lib/repo/post.repo';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const allPosts = (await getAllPosts()).slice(0, 10);

	const rssData = {
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allPosts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
			image: post.data.image?.src,
			enclosure: {
				url: post.data.image?.src,
				length: 0,
				type: `image/${post.data.image?.format}`
			},
			pubDate: post.data.date?.toDateString(),
		})),
	};

	return rss(rssData);
}
