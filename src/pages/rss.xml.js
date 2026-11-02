import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { getSite } from '../utils/consts';
import { withBase } from '../utils/slugify';

export async function GET(context) {
	const posts = (await getCollection('journal')).filter((post) => post.id.startsWith('es/'));
	const site = await getSite();
	return rss({
		title: site.title,
		description: site.description,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: withBase(`/journal/${post.id.replace(/^es\//, '')}/`),
		})),
	});
}
